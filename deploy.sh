#!/bin/bash

sudo rm -r docs/docs
sudo ng build --prod --output-path docs/docs --base-href hymns2
cd docs/docs && sudo mv *.* ../hymns2
sudo rm -r ../hymns2/assets
sudo mv assets ../hymns2

sudo rm -r /var/www/html/hymns2
sudo cp -r ../hymns2 /var/www/html/

cd ../hymns2 && sudo git add . && sudo git commit -m "updating website" && sudo git push --all
#cd /var/www/html/hymns2 && sudo git pull
