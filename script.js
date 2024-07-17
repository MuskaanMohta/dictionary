const form = document.querySelector('form');
const resultBox = document.querySelector('.result');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    getWordInfo(form.elements[0].value);   
});

const getWordInfo = async (word)=>{
    try {    
        resultBox.innerHTML = `Fetching Data....`
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await response.json();
        console.log(data);
        //show the (1)word (2) part of speech (3) definition/meaning of the word and (4) example 
        resultBox.innerHTML = `
            <h2><strong>Word:- </strong>${data[0].word}</h2> 
        
            <p class="partOfSpeech">${data[0].meanings[0].partOfSpeech}</p>
        
            <p><strong>Meaning:- </strong>${data[0].meanings[0].definitions[0].definition === undefined ? "Not Found" : data[0].meanings[0].definitions[0].definition}</p>
        
            <p><strong>Example:- </strong>${data[0].meanings[0].definitions[0].example === undefined ? "Not found":data[0].meanings[0].definitions[0].example}</p>   
        `;

        //Synonyms
        if(data[0].meanings[0].definitions[0].synonyms.length === 0){
            resultBox.innerHTML += `<span></span>`
        }
        else{
            resultBox.innerHTML +=`<p><strong>Synonyms:- </strong></p>`
            for(let i=0;i<data[0].meanings[0].definitions[0].synonyms.length;i++){
                resultBox.innerHTML += `<li>${data[0].meanings[0].definitions[0].synonyms[i]}</li>`
            }
        }
        
        //Antonyms
        if(data[0].meanings[0].definitions[0].antonyms.length === 0){
          resultBox.innerHTML += `<span></span>`
        }
        else{
            resultBox.innerHTML += `<p><strong>Antonyms:- </strong></p>`
            for(let i=0;i<data[0].meanings[0].definitions[0].antonyms.length;i++){
                resultBox.innerHTML += `<li>${data[0].meanings[0].definitions[0].antonyms[i]}</li>`
            }
        }
        //Read More Button
        resultBox.innerHTML += `<div><a href = "${data[0].sourceUrls}" target="_blank">Read More </a></div>`
         //target=_blank -> the website will be opened in a new tab
        
    }
    catch (error) {
       resultBox.innerHTML = `<p>Sorry,the word could not be found</p>` 
    }
    
}