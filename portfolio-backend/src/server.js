import express from 'express';
import bodyParser from 'body-parser';
import {MongoClient} from 'mongodb';
import path from 'path';

const app = express();
app.use(express.static(path.join(__dirname, '/build')));
app.use(bodyParser.json());

const withDB = async (operation) => {
    try{
        const client = await MongoClient.connect("mongodb://127.0.0.1:27017/myDB",{useNewUrlParser:true});
        const db = client.db('myDB');
        await operation(db);
        client.close();
    }catch(e){
        console.log(e)
    }
}

app.get('/api/articles/:name',async (req,res) => {
    withDB(async(db)=>{
        const name = req.params.name;
        const obj = await db.collection('newArticles').findOne({title : name});
        res.status(200).json(obj);
    },res)
   
});

app.post('/api/articles/:name/upvote',async (req,res) => {

    withDB(async(db)=>{
        const name = req.params.name;
        const dbObj = await db.collection('newArticles').findOne({title:name});
        await db.collection('newArticles').updateOne({title:name},{
            '$set' : {
                upvote: dbObj.upvote + 1,
            }
        });
        const newDBObj = await db.collection('newArticles').findOne({title:name});
        res.status(200).json(newDBObj);
    },res)
   
});

app.post('/api/articles/:name/add-comment', async (req,res) => {
    const {username,text} = req.body;
    const name = req.params.name;

    withDB(async(db)=>{
        const dbObj = await db.collection('newArticles').findOne({title:name});
        console.log(dbObj.comments);
        await db.collection('newArticles').updateOne({title:name},{
            '$set': {
                comments:dbObj.comments.concat({ username,text }),
            }
        });
        const newDBObj = await db.collection('newArticles').findOne({title:name});
        res.status(200).json(newDBObj);
    },res)
        
});

app.get('/api/articles/all', (req,res) => {
    const all = articleInfo;
    //res.send(JSON.stringify(all));
    res.send(articleInfo);
});

app.get('*',(req,res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'));
})

app.listen(8000,() => console.log('Server is invoked'));