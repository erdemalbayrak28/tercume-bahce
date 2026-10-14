from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import subprocess, json, wave
import numpy as np

ROOT=Path(__file__).resolve().parent
OUT=ROOT/'output'; OUT.mkdir(exist_ok=True)
W,H=1080,1920
LIME='#C8F031'; WHITE='#EEF1F6'; MUTED='#929CA9'
LOGO=ROOT/'assets'/'saynovra-mark.png'
def font(s,bold=False): return ImageFont.truetype('C:/Windows/Fonts/'+('segoeuib.ttf' if bold else 'segoeui.ttf'),s)
def text(d,xy,t,s=32,c=WHITE,bold=False): d.text(xy,t,font=font(s,bold),fill=c,spacing=8)
def base():
 y,x=np.mgrid[:H,:W]; glow=np.exp(-((x-920)**2+(y-950)**2)/550000)
 arr=np.zeros((H,W,3),dtype=np.uint8)
 for i,v in enumerate([10,13,20]): arr[:,:,i]=v+glow*[10,15,7][i]
 im=Image.fromarray(arr); d=ImageDraw.Draw(im)
 for xx in range(64,W,96): d.line((xx,230,xx,1710),fill=(23,28,35),width=1)
 for yy in range(230,1710,96): d.line((64,yy,1016,yy),fill=(23,28,35),width=1)
 text(d,(64,139),'DİJİTAL ÇÖZÜMLER',25,WHITE,True)
 d.line((64,210,1016,210),fill='#353C47',width=2)
 text(d,(64,1770),'WEB TASARIM  ·  GOOGLE GÖRÜNÜRLÜĞÜ',20,MUTED)
 return im
def panel(site):
 im=base();d=ImageDraw.Draw(im)
 terc=site=='tercume'
 text(d,(64,260),'TERCÜME OFİSİ İÇİN' if terc else 'NİŞAN SALONU İÇİN',28,LIME,True)
 text(d,(60,320),'İşletmeniz için\ndijital görünürlük.' if terc else 'Özel günler için\ndijital vitrin.',68,WHITE,True)
 # Desktop browser + laptop chassis.
 d.rounded_rectangle((54,568,1026,1220),radius=26,fill='#05070B',outline='#535C68',width=2)
 d.rounded_rectangle((68,581,1012,622),radius=12,fill='#222832')
 for i,c in enumerate(['#FF6B61','#F8C65D','#54C990']): d.ellipse((85+i*22,595,96+i*22,606),fill=c)
 text(d,(310,586),'WEB SİTESİ / MASAÜSTÜ GÖRÜNÜMÜ',17,'#B8C0C9')
 d.polygon([(54,1220),(1026,1220),(1060,1252),(20,1252)],fill='#747D87')
 d.rounded_rectangle((20,1244,1060,1261),radius=8,fill='#343D47')
 d.rounded_rectangle((430,1220,650,1232),radius=5,fill='#262E38')
 # Phone shell placed below/right of computer to keep both views readable.
 d.rounded_rectangle((658,945,998,1675),radius=44,fill='#05070A',outline='#65707D',width=3)
 d.rounded_rectangle((668,958,988,1662),radius=32,fill='#151A21')
 text(d,(64,1324),'WEB SİTESİ',23,LIME,True)
 text(d,(60,1372),'Masaüstü ve\ntelefonda.',42,WHITE,True)
 text(d,(64,1520),'Her ekrana uyumlu',25,MUTED)
 text(d,(64,1689),'Web sitesi · Search Console · Google Ads',26,WHITE)
 im.save(OUT/(site+'-base.png'))
 frame=Image.new('RGBA',(W,H),(0,0,0,0)); fd=ImageDraw.Draw(frame)
 fd.rounded_rectangle((658,945,998,1675),radius=44,fill='#05070A',outline='#65707D',width=3)
 fd.rounded_rectangle((668,958,988,1662),radius=32,fill='#151A21')
 frame.save(OUT/'phone-frame.png')
def title(name,headline,kicker,sub):
 im=base();d=ImageDraw.Draw(im)
 if name=='intro':
  text(d,(64,500),kicker,23,LIME,True)
  text(d,(60,640),headline,85,WHITE,True)
  d.rounded_rectangle((64,1030,1016,1130),radius=18,fill=LIME)
  text(d,(90,1060),sub,29,'#0A0D14',True)
  text(d,(64,1260),'Tercüme ofisi',32,WHITE,True)
  text(d,(64,1325),'Nişan salonu',32,WHITE,True)
  text(d,(64,1470),'Google Search Console optimizasyonu · Google Ads',25,MUTED)
 else:
  mark=Image.open(LOGO).convert('RGBA'); mark.thumbnail((310,310))
  im.alpha_composite(mark,(80,650)) if im.mode=='RGBA' else im.paste(mark,(80,650),mark)
  text(d,(64,1060),'SAYNOVRA',68,WHITE,True)
  d.line((64,1170,430,1170),fill=LIME,width=5)
  text(d,(64,1250),'Dijitalde öne çıkın.',38,MUTED)
 im.save(OUT/(name+'.png'))
def run(args):
 p=subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-y']+args,capture_output=True,text=True)
 if p.returncode: raise RuntimeError(p.stderr[-6000:])
def enc():return ['-c:v','libx264','-preset','fast','-crf','19','-pix_fmt','yuv420p','-r','30','-threads','4','-an']
def duration(p):return float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',str(p)],text=True).strip())
def render():
 title('intro','İnternette\nöne çıkın.','İŞLETMELER İÇİN','WEB SİTESİ  ·  SEARCH CONSOLE SEO  ·  GOOGLE ADS')
 title('outro','','','')
 for name,seconds in [('intro',3),('outro',4)]:
  run(['-loop','1','-i',str(OUT/(name+'.png')),'-t',str(seconds),'-vf',f"scale=1124:1998,crop=1080:1920:x=22:y=39,fade=t=in:d=0.2,fade=t=out:st={seconds-.2}:d=0.2"]+enc()+[str(OUT/(name+'.mp4'))])
 for site in ['tercume','bahce']:
  panel(site)
  clips=[ROOT/'captures'/f'{site}-{dev}.webm' for dev in ['desktop','mobile']]
  skips=[max(0,duration(p)-18) for p in clips]
  filt=(f'[1:v]trim=start={skips[0]},setpts=PTS-STARTPTS,fps=30,scale=944:590[desk];'
        f'[2:v]trim=start={skips[1]},setpts=PTS-STARTPTS,fps=30,scale=312:676[phone];'
        '[0:v][desk]overlay=68:622:shortest=1[a];[a][3:v]overlay=0:0[b];[b][phone]overlay=672:971:shortest=1,'
        'drawbox=x=68:y=623:w=944:h=80:color=0x151A21:t=fill,'
        'drawbox=x=671:y=972:w=320:h=125:color=0x151A21:t=fill,'
        'drawbox=x=773:y=977:w=110:h=17:color=black:t=fill,'
        "drawbox=x=64:y=1745:w='952':h=3:color=0x303A46:t=fill,fade=t=in:d=0.35,fade=t=out:st=17.65:d=0.35[v]")
  run(['-loop','1','-i',str(OUT/(site+'-base.png')),'-i',str(clips[0]),'-i',str(clips[1]),'-loop','1','-i',str(OUT/'phone-frame.png'),'-filter_complex',filt,'-map','[v]','-t','18']+enc()+[str(OUT/(site+'.mp4'))])
  print('Rendered',site,flush=True)
 # Original restrained electronic instrumental, generated for this reel.
 sr=44100; length=43; t=np.arange(sr*length)/sr; audio=np.zeros_like(t)
 for start in np.arange(0,length,.625):
  tt=t-start; mask=(tt>=0)&(tt<.25); z=tt[mask]
  audio[mask]+=.22*np.sin(2*np.pi*(52*z+3*(1-np.exp(-z*30))))*np.exp(-z*19)
 for n,start in enumerate(np.arange(0,length,.3125)):
  tt=t-start;mask=(tt>=0)&(tt<.23);z=tt[mask];freq=[220,329.63,440,293.66,220,392,329.63,293.66][n%8]
  audio[mask]+=.052*np.sin(2*np.pi*freq*z)*np.sin(np.pi*np.minimum(z/.012,1)/2)*np.exp(-z*12)
 fade=np.minimum(t/1.2,1)*np.minimum((length-t)/2,1); audio=np.clip(audio*fade,-1,1)
 with wave.open(str(OUT/'original-soundtrack.wav'),'wb') as w:
  w.setnchannels(2);w.setsampwidth(2);w.setframerate(sr);w.writeframes(np.column_stack([audio,audio*.97]).astype('float64').__mul__(32767).astype('<i2').tobytes())
 (OUT/'concat.txt').write_text(''.join("file '"+n+".mp4'\n" for n in ['intro','tercume','bahce','outro']))
 run(['-f','concat','-safe','0','-i',str(OUT/'concat.txt'),'-i',str(OUT/'original-soundtrack.wav'),'-c:v','copy','-c:a','aac','-b:a','192k','-shortest','-movflags','+faststart',str(OUT/'SAYNOVRA-yaptigimiz-isler.mp4')])
 Image.open(OUT/'intro.png').convert('RGB').save(OUT/'kapak.jpg',quality=95)
 frames=[]
 for i,second in enumerate([1,5,11,18,23,29,36,41]):
  p=OUT/f'check-{i}.jpg';run(['-ss',str(second),'-i',str(OUT/'SAYNOVRA-yaptigimiz-isler.mp4'),'-frames:v','1',str(p)])
  frames.append(Image.open(p).resize((270,480)))
 sheet=Image.new('RGB',(1080,960))
 for i,im in enumerate(frames):sheet.paste(im,((i%4)*270,(i//4)*480))
 sheet.save(OUT/'kontrol.jpg',quality=90)
 print(json.dumps({'video':str(OUT/'SAYNOVRA-yaptigimiz-isler.mp4'),'duration':duration(OUT/'SAYNOVRA-yaptigimiz-isler.mp4')},ensure_ascii=False),flush=True)
if __name__=='__main__':render()

