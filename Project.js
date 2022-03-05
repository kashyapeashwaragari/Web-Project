"use strict";
// fetching data from rss file
let events=[];
    fetch('events.rss')
    .then(response => response.text())
    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
    .then(data =>{
        let items = data['documentElement'].querySelectorAll("item");
        // creating html document to store the fetched results
    let html = ``;
    
    items.forEach(el => {
        // looping to get all the data and saving them in html tags
        events.push({
            title: el.querySelectorAll('title')[0].innerHTML, 
            imageUrl: el.getElementsByTagName('enclosure').length > 0 ? el.getElementsByTagName('enclosure')[0].getAttribute('url') :'Images\\Florida_Tech_Panther.png',
            description:el.querySelectorAll('description')[0].innerHTML.replace(']]>',''),
            startDate:el.querySelectorAll('start')[0].innerHTML,
            displayStartDate:new Date(el.querySelectorAll('start')[0].innerHTML).toLocaleDateString(),
            location: el.querySelectorAll('location')[0].innerHTML
        });
        html += `
        <article class="load">
        <img src =  "${el.getElementsByTagName('enclosure').length > 0 ? el.getElementsByTagName('enclosure')[0].getAttribute('url') :'Images\\Florida_Tech_Panther.png'}" >
        <h3 class ="title">${el.querySelectorAll('title')[0].innerHTML}</h3>
        <p class="date">${new Date(el.querySelectorAll('start')[0].innerHTML).toLocaleDateString()}</p>
        <p>${el.querySelectorAll('location')[0].innerHTML}</p>
        <button  class ='button'>Learn More</button> 
        <div id= "des" class="mystyle">${el.querySelectorAll('description')[0].innerHTML.replace(']]>','')}</div>
        


        

        </article>
        
    
    
        `
       
        // To transfer all the html tags to project.html file
        //document.querySelector('.script').insertAdjacentHTML("beforeend", html);
      
   

        
    });
    document.querySelector('.script').innerHTML=html;
    // creating a function to toggle the description
    let buttons = document.querySelectorAll('.button')
    buttons.forEach(button=>{
        button.addEventListener('click', (e)=>{
            button.parentElement.querySelector('#des').classList.toggle('mystyle');
            console.log(button.parentElement.querySelector('#des'))
            
            
        })
        
        
    })
    
    
})
//};

function handleClearFilter(){
    document.getElementById('title-input').value='';
    document.getElementById('desc-input').value='';
    document.getElementById('date-input').value='';
    
    
    let html = ``;
    
    events.forEach(el => {
        // looping to get all the data and saving them in html tags
      
        html += `
        <article class="load">
        <img src =  "${el.imageUrl}" >
        <h3 class ="title">${el.title}</h3>
        <p class="date">${el.displayStartDate}</p>
        <p>${el.location}</p>
        <button  class ='button'>Learn More</button> 
        <div id= "des" class="mystyle">${el.description}</div>
        


        

        </article>
        
    
    
        `
       
        
       
      
   

        
    });
    // To transfer all the html tags to project.html file
    document.querySelector('.script').innerHTML=html;
    let buttons = document.querySelectorAll('.button')
    buttons.forEach(button=>{
        button.addEventListener('click', (e)=>{
            button.parentElement.querySelector('#des').classList.toggle('mystyle');
            console.log(button.parentElement.querySelector('#des'))
            
            
        })
        
        
    })
}
// using filter function to filter the data
function handleFilterSearch(){
    const filterContent = 
        { 
        'title': document.getElementById('title-input').value,
        'description': document.getElementById('desc-input').value,
        'startDate': document.getElementById('date-input').value
        }    

    let items=events;
    if(filterContent.title!==''){
        items=filterByTitle(items,filterContent.title);
    }
    if(filterContent.description!==''){
        items=filterByDescription(items,filterContent.description);
    }
    if(filterContent.startDate!==''){
        items=filterByDate(items,filterContent.startDate);
    }
    
  
    
    let html = ``;
    
    items.forEach(el => {
        // looping to get all the data and saving them in html tags
      
        html += `
        <article class="load">
        <img src =  "${el.imageUrl}" >
        <h3 class ="title">${el.title}</h3>
        <p class="date">${el.displayStartDate}</p>
        <p>${el.location}</p>
        <button  class ='button'>Learn More</button> 
        <div id= "des" class="mystyle">${el.description}</div>
        


        

        </article>
        
    
    
        `
       
        
       
      
   

        
    });
    // To transfer all the html tags to project.html file
    document.querySelector('.script').innerHTML=html;
    // Toggle the learnmore button
    let buttons = document.querySelectorAll('.button')
    buttons.forEach(button=>{
        button.addEventListener('click', (e)=>{
            button.parentElement.querySelector('#des').classList.toggle('mystyle');
            console.log(button.parentElement.querySelector('#des'))
            
            
        })
        
        
    })
    

}

// Filter by title
function filterByTitle(items,value){
    return items.filter(ev=>{
        return ev.title.toUpperCase().includes(value.toUpperCase());
    })
}
// Filter by description
function filterByDescription(items,value){
    return items.filter(ev=>{
        return ev.description.toUpperCase().includes(value.toUpperCase());
    })
}
// Filter by Date
function filterByDate(items,value){
    return items.filter(ev=>{
        return new Date(ev.startDate).toLocaleDateString()===new Date(value+'T00:05:00').toLocaleDateString();
    })
}


       
    
