const base_URL="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const from_curr=document.querySelector(".from select");
const to_curr=document.querySelector(".to select");
const msg=document.querySelector(".msg");

for(let i of dropdowns)
{
    for(let currencycode in countryList)
    {
        let newoption=document.createElement("option");
        newoption.innerText=currencycode;
        newoption.value=currencycode;
        i.append(newoption);

        //this if statemnt are for selected country for "from" and "to" 
        if(i.name==="from" && currencycode==="USD") 
        {
            newoption.selected="selected";
        }
        else if(i.name==="to" && currencycode==="INR")
        {
            newoption.selected="selected";
        }
        

    }

    i.addEventListener("change",(arg)=>{
        updateflag(arg.target);
    });
}

const updateflag=(element)=>
{
    let crnycode=element.value;
    let cntycode=countryList[crnycode];
//now element is i
    let newURL=`https://flagsapi.com/${cntycode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    //element parent is in dropdown select is there .so parent parent is dropdown.now we are accesing the img tag
    img.src=newURL;
};


btn.addEventListener("click", async(arg)=>{
    arg.preventDefault();//this function prevent the button doing its automatic work
    let amt=document.querySelector(".amount input");
    let amtvalue=amt.value;

    if(amtvalue===""||amtvalue<1)
    {
        amtvalue=1;
        amt.value="1";
    }
    const main_URL=`${base_URL}/${from_curr.value.toLowerCase()}/${to_curr.value.toLowerCase()}.json`;
    //console.log(from_curr.value,to_curr.value);

    let response=await fetch(main_URL);
    let data=await response.json();
    
    //console.log(data)
    let rate =data[to_curr.value.toLowerCase()];
    let finalamt=amtvalue*rate;
    msg.innerText=`${amtvalue} ${from_curr.value} = ${finalamt}${to_curr.value}`;



    
});








 