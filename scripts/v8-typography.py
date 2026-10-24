from PIL import Image,ImageDraw,ImageFont,ImageFilter
import json, pathlib
root=pathlib.Path("caption-v8")
root.mkdir(exist_ok=True)
font="/tmp/bev8.ttf"
cards=[
 {"act":"HOOK","lines":["Bạn tưởng thành công","đến từ khoảnh khắc lớn?"],"focus":"khoảnh khắc lớn?"},
 {"act":"HOOK","lines":["KHÔNG ĐÂU!"],"focus":"KHÔNG ĐÂU!"},
 {"act":"THÂN BÀI","lines":["Nó bắt đầu từ","một trang sách."],"focus":"một trang sách."},
 {"act":"THÂN BÀI","lines":["Mười phút","cố gắng."],"focus":"cố gắng."},
 {"act":"THÂN BÀI","lines":["Một lần muốn bỏ cuộc...","nhưng vẫn tiếp tục."],"focus":"vẫn tiếp tục."},
 {"act":"CAO TRÀO","lines":["Ngày đầu, chẳng ai","thấy khác biệt."],"focus":"chẳng ai"},
 {"act":"CAO TRÀO","lines":["Nhưng mỗi ngày","một chút..."],"focus":"một chút..."},
 {"act":"CAO TRÀO","lines":["Bạn đang tiến lên,","nhanh hơn bạn nghĩ!"],"focus":"nhanh hơn bạn nghĩ!"},
 {"act":"SUY NGẪM","lines":["Rồi một ngày, ngoảnh lại...","bạn đã đi rất xa."],"focus":"đi rất xa."},
 {"act":"SUY NGẪM","lines":["Điều kỳ diệu...","là bạn đã không dừng lại."],"focus":"không dừng lại."}
]
for i,c in enumerate(cards,1):
    lines=c["lines"]
    temp=Image.new("RGBA",(640,640)); dr=ImageDraw.Draw(temp)
    for fs in range(55,30,-1):
        f=ImageFont.truetype(font,fs)
        if max(dr.textlength(line,font=f) for line in lines) <= 558: break
    lh=fs+23
    yy=319-len(lines)*lh/2
    shadow=Image.new("RGBA",(640,640))
    ds=ImageDraw.Draw(shadow)
    base=Image.new("RGBA",(640,640))
    db=ImageDraw.Draw(base)
    focus=Image.new("RGBA",(640,640))
    df=ImageDraw.Draw(focus)
    high=c["focus"]
    for k,line in enumerate(lines):
        y=yy+k*lh
        x=(640-dr.textlength(line,font=f))/2
        ds.text((x+2,y+5),line,font=f,fill=(0,0,0,220),stroke_width=5,stroke_fill=(0,0,0,170))
        db.text((x,y),line,font=f,fill=(248,249,247,255),stroke_width=1,stroke_fill=(19,30,23,180))
        pos=line.lower().find(high.lower())
        if pos>=0:
            fx=x+dr.textlength(line[:pos],font=f)
            df.text((fx,y),high,font=f,fill=(255,204,103,255),stroke_width=1,stroke_fill=(22,26,18,120))
            underline_y=y+fs+9
            df.rounded_rectangle([fx+3,underline_y,fx+dr.textlength(high,font=f)-3,underline_y+3],radius=1,fill=(255,208,115,230))
    shadow=shadow.filter(ImageFilter.GaussianBlur(6))
    comp=Image.alpha_composite(shadow,base)
    label_font=ImageFont.truetype(font,19)
    dl=ImageDraw.Draw(comp)
    dl.text((38,54),f'{i:02}  /  {c["act"]}',font=label_font,fill=(255,211,125,232))
    # Small gold progress accent, no extra text clutter
    ImageDraw.Draw(comp).line((38,90,112,90),fill=(240,184,89,205),width=2)
    comp.save(root/f"base_{i:02}.png",optimize=True)
    focus.save(root/f"gold_{i:02}.png",optimize=True)
    c["font_size"]=fs
(root/"cards.json").write_text(json.dumps(cards,ensure_ascii=False,indent=2))
print("Be Vietnam Pro caption cards:",len(cards))
