let nameList = [];

module.exports = {
    getCompliment: (req, res) => {
        const compliments = [
            "Gee, you're a smart cookie!",
            "Cool shirt!",
            "Your Javascript skills are stellar.",
        ];
      
        // choose random compliment
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];
      
        res.status(200).send(randomCompliment);
        
    },

    getFortune: (req, res) => {
        const fortunes = [
            "Any day above ground is a good day.",
            "Dedicate yourself with a calm mind to the task at hand.",
            "Do not let ambitions overshadow small success.",
            "Do not make extra work for yourself.",
            "Failure is the chance to do better next time."
        ];
      
        // choose random fortune
        let randomIndex = Math.floor(Math.random() * fortunes.length);
        let randomFortune = fortunes[randomIndex];
      
        res.status(200).send(randomFortune);
    },

    postName: (req, res) => {
        const {name} = req.body;
           
        nameList.push(name);
        res.status(200).send(`Successfully received the name: ${name}`);
    },

    updateName: (req, res) => {
        const {newName} = req.body;
        const oldName = req.params.name;
      
        // Was running into problems sending headers more than once even with a return statement, so we're just hack this check in.
        let changedName = false;

        nameList.forEach((name, index) => {
            if(name.toLowerCase() === oldName.toLowerCase()) {
                nameList[index] = newName;
                changedName = true;

                res.status(200).send(`Successfully updated ${name} to ${newName} | List confirm: ${nameList[index]}`);
            }
        })

        if(!changedName) res.status(400).send("Name was not found or updated.");
    },

    deleteName: (req, res) => {
        const nameToDelete = req.params.name;

        // Same as before. I was running into problems sending headers more than once so we're just going to check that it's in the list.
        if(!nameList.includes(nameToDelete)) {
          res.sendStatus(400);
          return;
        }
        
        //I know this technically will delete the first match it finds in the list, and that it's not checking case sensitivity.
        else {
          nameList.forEach((name, index) => {
            if(name === nameToDelete) {
              nameList.splice(index, 1);
      
              res.status(200).send(`Successfully removed ${nameToDelete} | List confirm: ${nameList[index]}`);
              return;
            }
          })
        }    
    }
}