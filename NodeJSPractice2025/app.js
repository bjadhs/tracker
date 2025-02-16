import path from 'path';
import * as fs from 'fs/promises';

try{
    const data = await fs.readFile("README.md", "utf-8");
    console.log(data);
}catch(err){
    console.log(err);
}

// console.log(path.basename("/Users/bijayadhs/Desktop/GitHubPush/NodeJSPractice2025/index.js", ".js"));
// console.log(path.dirname("/Users/bijayadhs/Desktop/GitHubPush/NodeJSPractice2025/index.js"));
// console.log(path.extname("/Users/bijayadhs/Desktop/GitHubPush/NodeJSPractice2025/index.js"));
// console.log(path.join("/Users/bijayadhs/Desktop/GitHubPush/NodeJSPractice2025/", "test", "hello.js"));
// console.log(path.parse("/Users/bijayadhs/Desktop/GitHubPush/NodeJSPractice2025/index.js").ext);


// setInterval(()=>{
//     console.log('hello');
// }, 5000);