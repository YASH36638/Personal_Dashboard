console.log("hello");
let expression="";
let res;
const display=document.getElementById("display")
const cal= (data) =>
{
    expression+=data;
    display.innerText=expression;
}

const evalu = ()=>
{
    try{ const res=eval(expression);
    display.innerText=res;
    expression = res.toString();}
    catch(e)
    {
        display.innerText="Error";
        expression="";
    }
}

function cleary()
{
    expression="";
    display.innerText=expression;
}

function del1()
{
    expression=expression.slice(0,-1);
    display.innerText=expression;
}