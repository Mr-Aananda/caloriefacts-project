import os
from PIL import Image

logo_path = os.path.join(os.path.dirname(__file__), '..', 'public', 'logo.png')
ico_path = os.path.join(os.path.dirname(__file__), '..', 'public', 'favicon.ico')
apple_icon_path = os.path.join(os.path.dirname(__file__), '..', 'public', 'apple-touch-icon.png')
favicon_png_path = os.path.join(os.path.dirname(__file__), '..', 'public', 'favicon.png')

if os.path.exists(logo_path):
    img = Image.open(logo_path).convert("RGBA")
    # Save favicon.ico with multiple sizes
    img.save(ico_path, format='ICO', sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])
    # Save apple-touch-icon.png (180x180)
    img.resize((180, 180), Image.Resampling.LANCZOS).save(apple_icon_path, format='PNG')
    # Save favicon.png (32x32)
    img.resize((32, 32), Image.Resampling.LANCZOS).save(favicon_png_path, format='PNG')
    print("Favicon files generated successfully!")
else:
    print(f"Logo not found at {logo_path}")
