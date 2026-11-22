import os
import sys
from playwright.sync_api import sync_playwright

os.makedirs('tmp_screens', exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    
    # 1. Desktop captures (1600x900 viewport, scale 1.25)
    context = browser.new_context(
        viewport={'width': 1600, 'height': 900},
        device_scale_factor=1.25
    )
    page = context.new_page()
    
    # Page 1: Homepage Hero
    print("Capturing Home Hero...")
    page.goto('http://localhost:3000', wait_until='domcontentloaded')
    page.wait_for_timeout(2000)
    page.screenshot(path='tmp_screens/home_hero.png')
    
    # Page 1 scroll 1: Services Overview
    print("Capturing Home Services...")
    page.evaluate('window.scrollTo(0, 950)')
    page.wait_for_timeout(1000)
    page.screenshot(path='tmp_screens/home_services.png')
    
    # Page 1 scroll 2: Why Choose Us / Trust Badges
    print("Capturing Home Trust...")
    page.evaluate('window.scrollTo(0, 1900)')
    page.wait_for_timeout(1000)
    page.screenshot(path='tmp_screens/home_trust.png')
    
    # Page 2: Service Detail - Wedding Band
    print("Capturing Service Detail...")
    page.goto('http://localhost:3000/services/wedding-band', wait_until='domcontentloaded')
    page.wait_for_timeout(1500)
    page.screenshot(path='tmp_screens/service_band.png')
    
    page.evaluate('window.scrollTo(0, 850)')
    page.wait_for_timeout(1000)
    page.screenshot(path='tmp_screens/service_band_scroll.png')
    
    # Page 3: Packages
    print("Capturing Packages...")
    page.goto('http://localhost:3000/packages', wait_until='domcontentloaded')
    page.wait_for_timeout(1500)
    page.screenshot(path='tmp_screens/packages.png')
    
    page.evaluate('window.scrollTo(0, 750)')
    page.wait_for_timeout(1000)
    page.screenshot(path='tmp_screens/packages_scroll.png')
    
    # Page 4: Reviews & Map
    print("Capturing Reviews...")
    page.goto('http://localhost:3000/reviews', wait_until='domcontentloaded')
    page.wait_for_timeout(1500)
    page.screenshot(path='tmp_screens/reviews.png')
    
    page.evaluate('window.scrollTo(0, 800)')
    page.wait_for_timeout(1000)
    page.screenshot(path='tmp_screens/reviews_scroll.png')
    
    # Page 5: Contact
    print("Capturing Contact...")
    page.goto('http://localhost:3000/contact', wait_until='domcontentloaded')
    page.wait_for_timeout(1500)
    page.screenshot(path='tmp_screens/contact.png')
    
    context.close()
    
    # 2. Mobile Viewport (iPhone 14 style: 390x844, scale 2)
    mobile_context = browser.new_context(
        viewport={'width': 390, 'height': 844},
        device_scale_factor=2,
        is_mobile=True,
        has_touch=True
    )
    mobile_page = mobile_context.new_page()
    
    print("Capturing Mobile Home...")
    mobile_page.goto('http://localhost:3000', wait_until='domcontentloaded')
    mobile_page.wait_for_timeout(1500)
    mobile_page.screenshot(path='tmp_screens/mobile_home.png')
    
    print("Capturing Mobile Services...")
    mobile_page.evaluate('window.scrollTo(0, 850)')
    mobile_page.wait_for_timeout(1000)
    mobile_page.screenshot(path='tmp_screens/mobile_services.png')
    
    print("Capturing Mobile Packages...")
    mobile_page.goto('http://localhost:3000/packages', wait_until='domcontentloaded')
    mobile_page.wait_for_timeout(1500)
    mobile_page.screenshot(path='tmp_screens/mobile_packages.png')
    
    mobile_context.close()
    browser.close()

print("All screenshots captured successfully!")
