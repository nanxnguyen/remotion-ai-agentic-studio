from pathlib import Path
from PIL import Image,ImageDraw,ImageFont,ImageFilter
import json
ROOT=Path("caption-v9")
ROOT.mkdir(exist_ok=True)
FONT="/tmp/BeVietnamPro-ExtraBold.ttf"
CARDS=json.loads(r'''[["Có bao giờ bạn",""],["cố gắng rất nhiều…","cố gắng"],["mà cuộc sống vẫn chẳng khá hơn?","chẳng khá hơn"],["Bạn thức dậy, tiếp tục công việc,","tiếp tục"],["giấu đi những mệt mỏi.","mệt mỏi"],["Có những ngày…",""],["chỉ cần không bỏ cuộc","không bỏ cuộc"],["đã là một chiến thắng.","chiến thắng"],["Hãy nhìn một cái cây.","một cái cây"],["Trước khi vươn cao,","vươn cao"],["nó phải âm thầm cắm rễ.","âm thầm cắm rễ"],["Bạn cũng vậy!","Bạn cũng vậy"],["Những ngày khó khăn","khó khăn"],["đang giúp bạn mạnh mẽ hơn.","mạnh mẽ hơn"],["Vậy nên, đừng trách mình","đừng trách mình"],["vì chưa đến đích.","chưa đến đích"],["Có những sự trưởng thành…","trưởng thành"],["diễn ra trong im lặng.","trong im lặng"]]''')

def wordwrap(line, font, draw, width=530):
    terms=line.split()
    acc=[]
    for term in terms:
        if not acc or draw.textlength(acc[-1]+" "+term,font=font)<=width:
            if acc: acc[-1]+=" "+term
            else: acc.append(term)
        else:acc.append(term)
    return acc

entries=[]
for i,(sentence,keyword) in enumerate(CARDS,1):
    background=Image.new("RGBA",(640,640),(0,0,0,0))
    draw=ImageDraw.Draw(background)
    for size in range(57,29,-1):
        face=ImageFont.truetype(FONT,size)
        rows=wordwrap(sentence,face,draw)
        if len(rows)<=2 and all(draw.textlength(q,font=face)<=535 for q in rows): break
    assert len(rows)<=2,(i,rows)
    lh=size+20
    # Stable baseline across identical last two cards
    ytop=320-len(rows)*lh/2-15
    shadow=Image.new("RGBA",(640,640)); ds=ImageDraw.Draw(shadow)
    base=Image.new("RGBA",(640,640)); db=ImageDraw.Draw(base)
    gold=Image.new("RGBA",(640,640)); dg=ImageDraw.Draw(gold)
    for row_idx,line in enumerate(rows):
        y=ytop+row_idx*lh
        x=(640-draw.textlength(line,font=face))/2
        ds.text((x+2,y+4),line,font=face,fill=(0,0,0,210),stroke_width=4,stroke_fill=(0,0,0,145))
        db.text((x,y),line,font=face,fill=(249,250,246,255),stroke_width=1,stroke_fill=(7,18,10,175))
        if keyword:
            # highlight can reside in either single row or a row substring
            pos=line.casefold().find(keyword.casefold())
            if pos>=0:
                start=x+draw.textlength(line[:pos],font=face)
                dg.text((start,y),keyword,font=face,fill=(255,210,122,255),stroke_width=1,stroke_fill=(20,25,17,100))
                uy=y+size+8
                end=start+draw.textlength(keyword,font=face)
                dg.rounded_rectangle((start+3,uy,end-3,uy+2),radius=1,fill=(255,209,124,215))
    # For keyword spans across rows, put gold on the words that are present in each row
    if keyword and not any(keyword.casefold() in ln.casefold() for ln in rows):
        sub=keyword.casefold().split()
        for row_idx,line in enumerate(rows):
            for split_len in range(len(sub),0,-1):
                phrase=" ".join(sub[:split_len])
                pos=line.casefold().find(phrase)
                if pos>=0:
                    x=(640-draw.textlength(line,font=face))/2+draw.textlength(line[:pos],font=face)
                    y=ytop+row_idx*lh
                    word=line[pos:pos+len(phrase)]
                    dg.text((x,y),word,font=face,fill=(255,210,122,255))
                    sub=sub[split_len:]
                    break
    shadow=shadow.filter(ImageFilter.GaussianBlur(5))
    result=Image.alpha_composite(shadow,base)
    result.save(ROOT/f"base_{i:02d}.png",optimize=True)
    gold.save(ROOT/f"gold_{i:02d}.png",optimize=True)
    entries.append({"id":i,"text":sentence,"focus":keyword,"lines":rows,"fontSize":size})
(ROOT/"manifest.json").write_text(json.dumps(entries,ensure_ascii=False,indent=2)+"\n")
print("Rendered real Be Vietnam Pro typography:",len(entries))
