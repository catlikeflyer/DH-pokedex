import requests
import json

URL = "https://pokeapi.co/api/v2/pokemon"

def load_pokemon_info(pokemon: str):
    call = requests.get(URL+"/"+pokemon)
    data = json.loads(call.text)

    return data

class Pokemon:
    def __init__(self, pokemon):
        self.data = load_pokemon_info(pokemon)
        self.name = self.data['species']['name']
        self.image = self.data["sprites"]["other"]["official-artwork"]["front_default"]

        if len(self.data["types"]) < 2:
            self.types = [self.data["types"][0]["type"]["name"]]
        else: 
            self.types = [self.data["types"][0]["type"]["name"], self.data["types"][1]["type"]["name"]]

        self.icon = self.data["sprites"]["versions"]["generation-vii"]["icons"]["front_default"] 

    def get_stats(self):
        self.total_stats = 0
        self.stats = {}
        self.max_stat = 0

        for i in self.data['stats']:
            self.stats[i['stat']['name']] = i['base_stat']
            self.total_stats += i['base_stat']
            if i['base_stat'] > self.max_stat:
                self.max_stat = i['base_stat']

        return self.stats
