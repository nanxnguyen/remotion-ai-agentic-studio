import importlib.util, unittest
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('issue_state',ROOT/'scripts/silent_factory_issue_state.py')
mod=importlib.util.module_from_spec(spec);spec.loader.exec_module(mod)
class IssueTests(unittest.TestCase):
    def test_missing_token_fails_closed(self):
        with self.assertRaisesRegex(ValueError,'token'):
            mod.GitHubIssueStore('nanxnguyen/remotion-ai-agentic-studio','')
    def test_creates_issue_and_recovers(self):
        calls=[]
        def transport(method,path,body):
            calls.append((method,path,body))
            if method=='GET':return []
            return {'number':33,'body':body['body']}
        x=mod.GitHubIssueStore('nanxnguyen/remotion-ai-agentic-studio','token',transport=transport)
        record={'run_key':'2026-11-06/unbroken-bridge','status':'CREATED','history':[]}
        no=x.save(record)
        self.assertEqual(no,33)
        self.assertEqual(calls[-1][0],'POST')
        self.assertNotIn('token',str(calls))
    def test_recovers_exact_existing_issue(self):
        record={'run_key':'2026-11-06/unbroken-bridge','status':'CREATED','history':[]}
        def transport(method,path,body):
            return [{'number':23,'title':'Silent Factory: 2026-11-06/unbroken-bridge','body':mod.serialize_issue(record)}]
        s=mod.GitHubIssueStore('nanxnguyen/remotion-ai-agentic-studio','token',transport=transport)
        self.assertEqual(s.load(record['run_key'])['status'],'CREATED')
    def test_duplicate_issue_rejected(self):
        record={'run_key':'2026-11-06/unbroken-bridge','status':'CREATED'}
        def transport(method,path,body):
            issue={'number':2,'title':'Silent Factory: '+record['run_key'],'body':mod.serialize_issue(record)}
            return [issue,dict(issue,number=3)]
        s=mod.GitHubIssueStore('nanxnguyen/remotion-ai-agentic-studio','token',transport=transport)
        with self.assertRaisesRegex(ValueError,'multiple'):
            s.load(record['run_key'])
if __name__=='__main__':unittest.main()