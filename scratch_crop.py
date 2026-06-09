from PIL import Image
import os

img_path = 'public/assets/rf-logo.png'
out_path = 'public/assets/logo.png'

if os.path.exists(img_path):
    img = Image.open(img_path)
    w, h = img.size
    # Crop a square from the left (0, 0, h, h)
    mark = img.crop((0, 0, h, h))
    mark.save(out_path)
    print("Cropped successfully to logo.png")
else:
    print("rf-logo.png not found")
