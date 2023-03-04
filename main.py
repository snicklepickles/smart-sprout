import requests

token = "juqVr4zdVyTHOTaa2EO3kxvG0DoKH-JD3IMd9l42-QE"
id = 'sorbus-aucuparia'

r = requests.get(f'http://trefle.io/api/v1/species/{id}?token={token}')
print(r)