#!/bin/bash

sudo rm -r docs/docs
sudo ng build --prod --output-path docs/docs --base-href hymns
cd docs/docs && sudo mv *.* ../hymns
sudo rm -r ../hymns/assets
sudo mv assets ../hymns

sudo rm -r /var/www/html/hymns
sudo cp -r ../hymns /var/www/html/

#cd ../hymns2 && sudo git add . && sudo git commit -m "updating website" && sudo git push --all
#cd /var/www/html/hymns2 && sudo git pull
