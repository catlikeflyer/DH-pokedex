from flask import Flask, render_template
from pokemon import Pokemon

app = Flask(__name__)

@app.route("/")
@app.route("/main")
def main():
    return render_template('index.html')

@app.route("/<pokemon>")
def pokemon(pokemon):
    """
    Creates a pokemon object based on the clicked pokemon on index.
    If there is no pokemon, returns error template.
    """
    try:
        mon = Pokemon(pokemon)
        stats = mon.get_stats()
        total_stats = mon.total_stats
        max_stat = mon.max_stat

        stringify_stats = lambda x: str(x*100//max_stat)

        def check_style(stat):
            """
            Returns a bootstrap color class depending on the stat
            """
            if stat == "hp":
                return "bg-secondary"
            elif stat == "attack":
                return "bg-success"
            elif stat == "defense":
                return "bg-info"
            elif stat == "special-attack":
                return "bg-warning"
            elif stat == "special-defense":
                return "bg-danger"
            elif stat == 'speed':
                return ""

        return render_template('pokemon.html', **locals())
    
    except:
        return render_template('error.html')

if __name__ == "__main__":
    app.run()