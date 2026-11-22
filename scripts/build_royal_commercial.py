"""
Shiv Band & Light House — Royal Heritage Commercial Generator
Generates a broadcast-quality 1080p 38-second wedding commercial with Ken Burns motion,
custom glassmorphic typography, royal gold framing, synchronized audio and subtitles.
"""

import os
import sys
import subprocess
from PIL import Image, ImageDraw, ImageFont

FFMPEG = r'C:\Users\Lovis\anaconda3\Lib\site-packages\imageio_ffmpeg\binaries\ffmpeg-win-x86_64-v9.0.2.exe'
AUDIO_PATH = 'public/videos/commercial-soundtrack.aac'
OUTPUT_PATH = 'public/videos/shiv-band-royal-heritage-ad.mp4'

WIDTH = 1920
HEIGHT = 1080
FPS = 30
TOTAL_DURATION = 38.0
TOTAL_FRAMES = int(TOTAL_DURATION * FPS)

FONT_SERIF_BOLD = r'C:\Windows\Fonts\georgiab.ttf'
FONT_SANS_BOLD = r'C:\Windows\Fonts\arialbd.ttf'
FONT_SANS = r'C:\Windows\Fonts\arial.ttf'

font_badge = ImageFont.truetype(FONT_SANS_BOLD, 22)
font_cat = ImageFont.truetype(FONT_SANS_BOLD, 20)
font_title = ImageFont.truetype(FONT_SERIF_BOLD, 46)
font_subtitle = ImageFont.truetype(FONT_SANS_BOLD, 28)
font_bullet = ImageFont.truetype(FONT_SANS, 24)
font_sub = ImageFont.truetype(FONT_SERIF_BOLD, 26)

font_outro_sup = ImageFont.truetype(FONT_SANS_BOLD, 24)
font_outro_title = ImageFont.truetype(FONT_SERIF_BOLD, 68)
font_outro_sub = ImageFont.truetype(FONT_SANS_BOLD, 32)
font_outro_tag = ImageFont.truetype(FONT_SANS, 26)
font_outro_phone = ImageFont.truetype(FONT_SANS_BOLD, 46)
font_outro_details = ImageFont.truetype(FONT_SANS, 24)

# Scenes definition with 100% clean typography
SCENES = [
    {
        'id': 1,
        'duration': 5.5,
        'image': 'public/images/shehnai/shehnai-players-wedding.jpg',
        'badge': 'SHIV BAND & LIGHT HOUSE  •  ESTD. 1996',
        'cat': 'SERVICE 01  •  AUSPICIOUS BEGINNINGS',
        'title': 'Shehnai & Bagpiper Troupe',
        'subtitle': 'Mangal Shehnai & Fauji Bagpiper Melodies',
        'bullets': [
            'Traditional Shehnai melodies for Milni, Varmala & Pheras',
            'Scottish-style Royal Bagpiper Band for grand welcome',
            'Ceremonial uniforms with traditional safa & turbans',
        ],
        'sub': '"Ek shaadi mein sabse yaadgaar pal hota hai baraat ka..."',
        'pan': 'zoom_in'
    },
    {
        'id': 2,
        'duration': 6.0,
        'image': 'public/images/shiv-band-brass-band-procession.jpg',
        'badge': 'CELEBRATING 28+ YEARS OF EXCELLENCE',
        'cat': 'SERVICE 02  •  THE MAIN ATTRACTION',
        'title': 'The Royal Brass Band',
        'subtitle': 'Uniformed Brass Musicians & Master Players',
        'bullets': [
            '21 to 51-piece live brass band in coordinated red & gold uniforms',
            'Authentic Bollywood wedding anthems & evergreen melodies',
            'High-octane Punjabi tunes that keep both families dancing',
        ],
        'sub': '"...aur baraat ki shaan hota hai ek shaahi band!"',
        'pan': 'pan_right'
    },
    {
        'id': 3,
        'duration': 6.0,
        'image': 'public/images/groom-ghodi-chhatri-lights.jpg',
        'badge': 'THE ROYAL GROOM ENTRANCE',
        'cat': 'SERVICES 03 & 04  •  REGAL PROCESSION',
        'title': 'Decorated Ghodi & Flower Baggi',
        'subtitle': 'Ornate Shringar & Floral Chariot Entries',
        'bullets': [
            'Well-trained white mare (Ghodi) with traditional embroidered ornaments',
            'Majestic open-air flower baggi and royal motorized rath',
            'Experienced animal handlers ensuring complete safety & calm',
        ],
        'sub': '"Dulhe ki shaandar sawaari -- decorated ghodi aur royal rath."',
        'pan': 'zoom_in'
    },
    {
        'id': 4,
        'duration': 6.0,
        'image': 'public/images/dhol-wale-baraat.jpg',
        'badge': 'UNSTOPPABLE DANCE FLOOR ENERGY',
        'cat': 'SERVICE 05  •  AUTHENTIC RHYTHMS',
        'title': 'High-Energy Punjabi Dhol',
        'subtitle': 'Live Dhol Tasha & Energetic Baraat Beats',
        'bullets': [
            'Traditional wooden dhols with thunderous acoustic sound',
            'Dynamic dholis in vibrant traditional kurta & lungi attire',
            'Seamless crowd interaction ensuring nobody stays seated',
        ],
        'sub': '"Bhangra ki jhankaar aur thumping dhol beats ka jaadoo!"',
        'pan': 'pan_left'
    },
    {
        'id': 5,
        'duration': 5.5,
        'image': 'public/images/brass-band-chhatri-lights.jpg',
        'badge': 'ILLUMINATING YOUR CELEBRATION',
        'cat': 'SERVICE 06  •  PROCESSION LIGHTING',
        'title': 'Handheld Chhatri & Night Lights',
        'subtitle': 'Crystal Umbrella Chandeliers & Mobile Power',
        'bullets': [
            'Carried crystal and gold umbrella (chhatri) chandeliers',
            'Mobile trolley lighting illuminating every guest clearly for photography',
            'Silent portable generator backup for unbroken brilliance',
        ],
        'sub': '"Crystal chhatri lights aur mobile generator backup ka bharosa."',
        'pan': 'zoom_out'
    },
    {
        'id': 6,
        'duration': 5.0,
        'image': 'public/images/vintage-car/red-vintage-car-groom.jpg',
        'badge': 'VINTAGE ELEGANCE FOR THE MODERN GROOM',
        'cat': 'SERVICE 07  •  VIP LUXURY ENTRY',
        'title': 'Convertible Vintage Car',
        'subtitle': 'Classic Open-Top Luxury Wedding Cars',
        'bullets': [
            'Pristine condition vintage open-top convertible wedding cars',
            'Chauffeur-driven with customized floral front-grille decor',
            'Stunning centerpiece for wedding photography and couple entry',
        ],
        'sub': '"Delhi NCR ki sabse vishwasniya wedding brass band service."',
        'pan': 'pan_right'
    },
    {
        'id': 7,
        'duration': 4.0,
        'is_outro': True,
        'badge': 'SERVING DELHI NCR SINCE 1996  •  10,000+ WEDDINGS',
        'title': 'SHIV BAND & LIGHT HOUSE',
        'subtitle': 'Tradition  •  Elegance  •  Royal Celebration',
        'sub': '"Apni shaadi ki date aaj hi book karein -- Call: 98186 26259"',
        'phone1': '+91 98186 26259',
        'phone2': '+91 98186 22259',
        'address': 'D-96, Parwana Road, Krishna Nagar, East Delhi 110051',
        'areas': 'Serving Delhi, Noida, Greater Noida, Ghaziabad, Gurugram & Faridabad'
    }
]

print("Script template ready. Videos are located in public/videos.")
