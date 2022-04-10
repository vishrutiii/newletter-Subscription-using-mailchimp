const mailchimp = require("@mailchimp/mailchimp_marketing");
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.listen(process.env.PORT || 3000, function(){
    console.log("Server is listening at port 3000");
});

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

mailchimp.setConfig({
     apiKey: "enter your api key",
     server: "us20"
});

app.post("/", function(req, res){
    const firstName = req.body.fname;
    const secondName = req.body.lname;
    const email = req.body.email;
    const listId = "211c50fffa";
    // console.log(firstName, lastName, email);
    const subscribingUser = {
        firstName: firstName,
        lastName: secondName,
        email: email
       };
    async function run() {
        const response = await mailchimp.lists.addListMember(listId, {
         email_address: subscribingUser.email,
         status: "subscribed",
         merge_fields: {
         FNAME: subscribingUser.firstName,
         LNAME: subscribingUser.lastName
        }
        })
        console.log(response.id);
    };
    run();

    res.sendFile(__dirname + "/success.html")
    console.log(`Successfully added contact as an audience member. The contact's id is `);
    // ${response.id}.
    run().catch(e => res.sendFile(__dirname + "/failure.html"));
});



//https://hidden-peak-66751.herokuapp.com/
