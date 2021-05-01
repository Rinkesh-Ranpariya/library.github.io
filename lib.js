console.log('jsn');

class books
{
    constructor(name,author,book){
        this.name=name;
        this.author=author;
        this.book=book;

    }
}

let array;
class display
{
    
    print()
    {

        let items=localStorage.getItem('items');
        if(items == null)
        {
            array = []; 
        }
        else
        {
            array=JSON.parse(items);
        }
        // let dict={'name':b.name,'author':b.author,'book':b.book}
        // array.push(dict);
        // localStorage.setItem('items',array);
        

        let tBody=document.getElementById('tBody');
        let html='';
        array.forEach(function(element,index) {
            
        
            html +=`
            <tr class="allTr">
            <th scope="row">${index+1}</th>
            <td>${element.name}</td>
            <td>${element.author}</td>
            <td>${element.book}</td>
            <td><button class="btn btn-outline-success my-2 my-sm-0" type="submit" id="${index}"    onclick="deletebook(this.id)"> Delete
            </button></td>
            </tr>
            `
        });
        if(array.length != 0)
        {
           tBody.innerHTML=html;
        }
        else
        {
            tBody.innerHTML=`No Record`;
        }
    }

    clear()
    {
        document.getElementById('form').reset();
    }
    
    valid(b)
    {
        if(b.name.length<2 || b.author.length<2)
        {
            return false;
        }
        else
        {
            return true;
        }
    }

    show(h,mes)
    {
        let alerT=document.getElementById('alert');
        let html2=`
        
        <div class="alert alert-${h} alert-dismissible fade show" role="alert">
        <strong>${h}</strong> ${mes}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      `
      alerT.innerHTML=html2;
      
      setTimeout(() => {
          alerT.innerHTML='';
      }, 4000);
    }

}

function deletebook(indeX)
{
    let items=localStorage.getItem('items');
    if(items == null)
    {
        array = []; 
    }
    else
    {
        array=JSON.parse(items);
    }
    array.splice(indeX,1);
    localStorage.setItem('items',JSON.stringify(array));
    let d3=new display();
    d3.print();

}


let d2=new display();
d2.print();

let form =document.getElementById('form');
form.addEventListener('submit', function (e) {
    e.preventDefault();

    let name=document.getElementById('Name').value;
    let author=document.getElementById('Author').value;
    let r1=document.getElementById('r1');
    let r2=document.getElementById('r2');
    let r3=document.getElementById('r3');

    let book;
    if(r1.checked)
    {
        book=r1.value;
    }
    else if(r2.checked)
    {
        book=r2.value;
    }
    else if(r3.checked)
    {
        book=r3.value;
    }

    let b=new books(name,author,book);
    let d=new display();
    
    if(d.valid(b))
    {
        let items=localStorage.getItem('items');
        if(items == null)
        {
            array = []; 
        }
        else
        {
            array=JSON.parse(items);
        }
        let dict={'name':name,'author':author,'book':book};
        array.push(dict);
        localStorage.setItem('items',JSON.stringify(array));
    
        d.print(b);
        d.clear();
        d.show('success','Book Added Successfully !!!');
    }
    else
    {
        d.show('danger','Error !!!');
    }
    
});


let searchByName=document.getElementById('searchByName');
searchByName.addEventListener("input",function(){

    let searchValue=searchByName.value;
    let allTr=document.getElementsByClassName('allTr');

    Array.from(allTr).forEach(function (element) {
        let info=element.getElementsByTagName("td")[0].innerText;
        if(!info.includes(searchValue))
        {
            element.style.display='none';
        }
        // else
        // {
        //     element.style.display='none';
        // }
    });

});

