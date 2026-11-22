"""
Shiv Band & Light House — Official Website Clean Demo Video Generator
Pure, distraction-free website recording:
- No side card
- No music
- No step badges / header overlays (clean full-canvas centered mockups)
"""

import os
import sys
import subprocess
from PIL import Image, ImageDraw, ImageFont

FFMPEG = r'C:\Users\Lovis\anaconda3\Lib\site-packages\imageio_ffmpeg\binaries\ffmpeg-win-x86_64-v9.0.2.exe'
OUTPUT_PATH = 'public/videos/shiv-band-website-demo.mp4'

WIDTH = 1920
HEIGHT = 1080
FPS = 30
TOTAL_DURATION = 35.33
TOTAL_FRAMES = 1060

FONT_SERIF_BOLD = r'C:\Windows\Fonts\georgiab.ttf'
FONT_SANS_BOLD = r'C:\Windows\Fonts\arialbd.ttf'
FONT_SANS = r'C:\Windows\Fonts\arial.ttf'

font_cat = ImageFont.truetype(FONT_SANS_BOLD, 17)
font_url = ImageFont.truetype(FONT_SANS_BOLD, 17)

font_outro_title = ImageFont.truetype(FONT_SERIF_BOLD, 64)
font_outro_sub = ImageFont.truetype(FONT_SANS_BOLD, 30)
font_outro_phone = ImageFont.truetype(FONT_SANS_BOLD, 44)
font_outro_text = ImageFont.truetype(FONT_SANS, 24)

# Color Palette
COLOR_BG_START = (35, 4, 12)
COLOR_BG_END = (12, 1, 4)
COLOR_GOLD = (212, 175, 55)
COLOR_GOLD_LIGHT = (247, 230, 167)
COLOR_CREAM = (251, 245, 230)
COLOR_MUTED = (189, 163, 139)

# Desktop browser window coordinates (Perfect Center: 160px X margins, 100px Y margins)
WW, WH = 1600, 880
WX = (WIDTH - WW) // 2  # 160
WY = (HEIGHT - WH) // 2 # 100
HEADER_H = 46
CONTENT_W = WW - 4
CONTENT_H = WH - HEADER_H - 4
CX = WX + 2
CY = WY + HEADER_H + 2

# Mobile phone coordinates (Perfect Center: 110px Y margins)
PHONE_W = 420
PHONE_H = 860
PHONE_X = (WIDTH - PHONE_W) // 2  # 750
PHONE_Y = (HEIGHT - PHONE_H) // 2 # 110
BEZEL = 14
SCREEN_W = PHONE_W - 2 * BEZEL
SCREEN_H = PHONE_H - 2 * BEZEL
SX = PHONE_X + BEZEL
SY = PHONE_Y + BEZEL

print("Pre-loading web screenshots...")
img_home_hero = Image.open('tmp_screens/home_hero.png').convert('RGB')
img_service_band = Image.open('tmp_screens/service_band.png').convert('RGB')
img_packages = Image.open('tmp_screens/packages.png').convert('RGB')
img_contact = Image.open('tmp_screens/contact.png').convert('RGB')
img_reviews = Image.open('tmp_screens/reviews.png').convert('RGB')
img_mobile_home = Image.open('tmp_screens/mobile_home.png').convert('RGB')

def pre_scale_desktop(img):
    aspect = img.width / img.height
    sw = CONTENT_W
    sh = int(sw / aspect)
    return img.resize((sw, sh), Image.Resampling.LANCZOS)

scaled_home_hero = pre_scale_desktop(img_home_hero)
scaled_service_band = pre_scale_desktop(img_service_band)
scaled_packages = pre_scale_desktop(img_packages)
scaled_contact = pre_scale_desktop(img_contact)
scaled_reviews = pre_scale_desktop(img_reviews)

def pre_scale_mobile(img):
    aspect = img.width / img.height
    sw = SCREEN_W
    sh = int(sw / aspect)
    return img.resize((sw, sh), Image.Resampling.LANCZOS)

scaled_mobile_home = pre_scale_mobile(img_mobile_home)

# Pre-render Background gradient
base_bg = Image.new('RGB', (WIDTH, HEIGHT), COLOR_BG_END)
bdraw = ImageDraw.Draw(base_bg)
for y in range(HEIGHT):
    ratio = y / HEIGHT
    r = int(COLOR_BG_START[0] * (1 - ratio*0.7) + COLOR_BG_END[0] * (ratio*0.7))
    g = int(COLOR_BG_START[1] * (1 - ratio*0.7) + COLOR_BG_END[1] * (ratio*0.7))
    b = int(COLOR_BG_START[2] * (1 - ratio*0.7) + COLOR_BG_END[2] * (ratio*0.7))
    bdraw.line([(0, y), (WIDTH, y)], fill=(r, g, b))

def pre_render_browser_frame():
    frame_overlay = Image.new('RGBA', (WIDTH, HEIGHT), (0, 0, 0, 0))
    odraw = ImageDraw.Draw(frame_overlay)
    
    for offset in range(18, 0, -3):
        alpha = int(25 * (offset / 18.0))
        odraw.rounded_rectangle(
            [WX - offset, WY - offset, WX + WW + offset, WY + WH + offset],
            radius=20,
            fill=(0, 0, 0, alpha),
            outline=(212, 175, 55, int(15 * (offset / 18.0))),
            width=1
        )
    
    odraw.rounded_rectangle([WX, WY, WX + WW, WY + WH], radius=16, fill=(18, 2, 7, 255), outline=(212, 175, 55, 140), width=2)
    odraw.rounded_rectangle([WX, WY, WX + WW, WY + HEADER_H], radius=16, fill=(28, 4, 11, 255))
    odraw.rectangle([WX, WY + HEADER_H - 10, WX + WW, WY + HEADER_H], fill=(28, 4, 11, 255))
    odraw.line([(WX, WY + HEADER_H), (WX + WW, WY + HEADER_H)], fill=(212, 175, 55, 80), width=1)
    
    odraw.ellipse([WX + 20, WY + 16, WX + 33, WY + 29], fill=(255, 95, 86, 255))
    odraw.ellipse([WX + 42, WY + 16, WX + 55, WY + 29], fill=(255, 189, 46, 255))
    odraw.ellipse([WX + 64, WY + 16, WX + 77, WY + 29], fill=(39, 201, 63, 255))
    
    url_x = WX + WW // 2 - 220
    odraw.rounded_rectangle([url_x, WY + 9, url_x + 440, WY + HEADER_H - 9], radius=9, fill=(12, 1, 4, 255), outline=(212, 175, 55, 60), width=1)
    odraw.text((url_x + 35, WY + 13), "🔒  https://shivband.in", font=font_url, fill=COLOR_GOLD_LIGHT)
    
    return frame_overlay

browser_shell = pre_render_browser_frame()

def pre_render_mobile_frame():
    overlay = Image.new('RGBA', (WIDTH, HEIGHT), (0, 0, 0, 0))
    odraw = ImageDraw.Draw(overlay)
    
    for offset in range(20, 0, -3):
        odraw.rounded_rectangle(
            [PHONE_X - offset, PHONE_Y - offset, PHONE_X + PHONE_W + offset, PHONE_Y + PHONE_H + offset],
            radius=45,
            fill=(0, 0, 0, int(35 * (offset / 20.0))),
            outline=(212, 175, 55, int(15 * (offset / 20.0))),
            width=1
        )
    
    odraw.rounded_rectangle([PHONE_X, PHONE_Y, PHONE_X + PHONE_W, PHONE_Y + PHONE_H], radius=40, fill=(10, 1, 3, 255), outline=(212, 175, 55, 180), width=3)
    return overlay

mobile_shell = pre_render_mobile_frame()

def draw_outro_frame():
    frame = base_bg.copy()
    odraw = ImageDraw.Draw(frame)
    
    odraw.rectangle([60, 60, WIDTH - 60, HEIGHT - 60], outline=(212, 175, 55, 180), width=2)
    odraw.rectangle([70, 70, WIDTH - 70, HEIGHT - 70], outline=(212, 175, 55, 90), width=1)
    
    cx = WIDTH // 2
    cy = 220
    
    badge_str = "DELHI NCR'S MOST TRUSTED WEDDING BAND  •  ESTD. 1996"
    bbox = font_cat.getbbox(badge_str)
    bw = bbox[2] - bbox[0]
    odraw.rounded_rectangle([cx - bw//2 - 25, cy - 10, cx + bw//2 + 25, cy + 35], radius=20, fill=(35, 4, 12), outline=COLOR_GOLD, width=1)
    odraw.text((cx - bw//2, cy), badge_str, font=font_cat, fill=COLOR_GOLD_LIGHT)
    
    cy += 95
    title_str = "SHIV BAND & LIGHT HOUSE"
    t_bbox = font_outro_title.getbbox(title_str)
    tw = t_bbox[2] - t_bbox[0]
    odraw.text((cx - tw//2, cy), title_str, font=font_outro_title, fill=COLOR_GOLD_LIGHT)
    
    cy += 85
    sub_str = "The Complete Digital Platform for Your Royal Baraat"
    s_bbox = font_outro_sub.getbbox(sub_str)
    sw = s_bbox[2] - s_bbox[0]
    odraw.text((cx - sw//2, cy), sub_str, font=font_outro_sub, fill=COLOR_CREAM)
    
    cy += 80
    url_str = "🌐  https://shivband.in"
    u_bbox = font_outro_phone.getbbox(url_str)
    uw = u_bbox[2] - u_bbox[0]
    odraw.rounded_rectangle([cx - uw//2 - 35, cy - 12, cx + uw//2 + 35, cy + 60], radius=35, fill=(35, 4, 12), outline=COLOR_GOLD, width=2)
    odraw.text((cx - uw//2, cy), url_str, font=font_outro_phone, fill=COLOR_GOLD_LIGHT)
    
    cy += 105
    phone_str = "📞  +91 98186 26259   |   +91 98186 22259"
    p_bbox = font_outro_phone.getbbox(phone_str)
    pw = p_bbox[2] - p_bbox[0]
    odraw.text((cx - pw//2, cy), phone_str, font=font_outro_phone, fill=COLOR_CREAM)
    
    cy += 85
    addr_str = "D-96, Parwana Road, Krishna Nagar, East Delhi 110051"
    a_bbox = font_outro_text.getbbox(addr_str)
    aw = a_bbox[2] - a_bbox[0]
    odraw.text((cx - aw//2, cy), addr_str, font=font_outro_text, fill=COLOR_MUTED)
    
    cy += 40
    areas_str = "Serving Delhi, Noida, Greater Noida, Ghaziabad, Gurugram & Faridabad"
    ar_bbox = font_outro_text.getbbox(areas_str)
    arw = ar_bbox[2] - ar_bbox[0]
    odraw.text((cx - arw//2, cy), areas_str, font=font_outro_text, fill=COLOR_GOLD)
    
    return frame

SCENES = [
    {
        'id': 1,
        'frames': 165,
        'title': 'Homepage Hero',
        'type': 'desktop',
        'image': scaled_home_hero,
        'scroll_start': 0,
        'scroll_end': 140
    },
    {
        'id': 2,
        'frames': 165,
        'title': 'Service Catalog',
        'type': 'desktop',
        'image': scaled_service_band,
        'scroll_start': 0,
        'scroll_end': 420
    },
    {
        'id': 3,
        'frames': 165,
        'title': 'Package Estimator',
        'type': 'desktop',
        'image': scaled_packages,
        'scroll_start': 0,
        'scroll_end': 380
    },
    {
        'id': 4,
        'frames': 165,
        'title': 'Booking Flow & Contact',
        'type': 'desktop',
        'image': scaled_contact,
        'scroll_start': 0,
        'scroll_end': 160
    },
    {
        'id': 5,
        'frames': 165,
        'title': 'Customer Reviews',
        'type': 'desktop',
        'image': scaled_reviews,
        'scroll_start': 0,
        'scroll_end': 400
    },
    {
        'id': 6,
        'frames': 135,
        'title': 'Mobile Responsive',
        'type': 'mobile',
        'image': scaled_mobile_home,
        'scroll_start': 0,
        'scroll_end': 420
    },
    {
        'id': 7,
        'frames': 100,
        'title': 'Grand Outro',
        'type': 'outro'
    }
]

print("Pre-rendering static backgrounds for each scene (no step pills, no header)...")
scene_static_bases = []
for s_idx, scene in enumerate(SCENES):
    if scene['type'] == 'outro':
        scene_static_bases.append(draw_outro_frame())
    else:
        sb = base_bg.copy()
        if scene['type'] == 'desktop':
            sb.paste(browser_shell, (0, 0), browser_shell)
        elif scene['type'] == 'mobile':
            sb.paste(mobile_shell, (0, 0), mobile_shell)
        scene_static_bases.append(sb)

print("Starting FFmpeg pipeline (Ultra-Clean Video: No Audio, No Side Card, No Step Badges)...")
cmd = [
    FFMPEG,
    '-y',
    '-f', 'rawvideo',
    '-vcodec', 'rawvideo',
    '-s', f'{WIDTH}x{HEIGHT}',
    '-pix_fmt', 'rgb24',
    '-r', str(FPS),
    '-i', '-',
    '-an',
    '-c:v', 'libx264',
    '-preset', 'fast',
    '-crf', '18',
    '-pix_fmt', 'yuv420p',
    OUTPUT_PATH
]

proc = subprocess.Popen(cmd, stdin=subprocess.PIPE)

current_frame = 0

for s_idx, scene in enumerate(SCENES):
    scene_frames = scene['frames']
    s_id = scene['id']
    s_title = scene['title']
    s_type = scene['type']
    static_base = scene_static_bases[s_idx]
    
    print(f"Encoding Scene {s_id} / {len(SCENES)}: {s_title} ({scene_frames} frames)...")
    
    if s_type == 'outro':
        outro_bytes = static_base.tobytes()
        for i in range(scene_frames):
            proc.stdin.write(outro_bytes)
            current_frame += 1
        continue
    
    scroll_start = scene['scroll_start']
    scroll_end = scene['scroll_end']
    img = scene['image']
    
    for i in range(scene_frames):
        t = i / max(1, scene_frames - 1)
        ease = t * t * (3 - 2 * t)
        crop_y = scroll_start + (scroll_end - scroll_start) * ease
        
        frame = static_base.copy()
        
        if s_type == 'desktop':
            max_crop = max(0, img.height - CONTENT_H)
            actual_crop_y = min(max_crop, int(crop_y))
            cropped = img.crop((0, actual_crop_y, CONTENT_W, actual_crop_y + CONTENT_H))
            frame.paste(cropped, (CX, CY))
            fdraw = ImageDraw.Draw(frame)
            fdraw.rounded_rectangle([WX, WY, WX + WW, WY + WH], radius=16, outline=(212, 175, 55, 140), width=2)
            
        elif s_type == 'mobile':
            max_crop = max(0, img.height - SCREEN_H)
            actual_crop_y = min(max_crop, int(crop_y))
            cropped = img.crop((0, actual_crop_y, SCREEN_W, actual_crop_y + SCREEN_H))
            frame.paste(cropped, (SX, SY))
            fdraw = ImageDraw.Draw(frame)
            island_w, island_h = 100, 26
            ix = PHONE_X + (PHONE_W - island_w) // 2
            iy = SY + 8
            fdraw.rounded_rectangle([ix, iy, ix + island_w, iy + island_h], radius=13, fill=(0, 0, 0), outline=(50, 50, 50), width=1)
            hx = PHONE_X + (PHONE_W - 120) // 2
            hy = SY + SCREEN_H - 14
            fdraw.rounded_rectangle([hx, hy, hx + 120, hy + 4], radius=2, fill=(200, 200, 200, 180))
            fdraw.rounded_rectangle([PHONE_X, PHONE_Y, PHONE_X + PHONE_W, PHONE_Y + PHONE_H], radius=40, outline=(212, 175, 55, 180), width=3)
        
        proc.stdin.write(frame.tobytes())
        current_frame += 1

proc.stdin.close()
proc.wait()

print("Clean Master Website Demo Video rendered successfully!")
print(f"Output: {OUTPUT_PATH}")
print(f"Total Frames: {current_frame} (Duration: {current_frame / FPS:.2f}s)")
