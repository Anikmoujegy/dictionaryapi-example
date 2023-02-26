const find = () => {
    const container = document.getElementById("container")
    container.innerHTML = `
    </div>
        <div class="text-center my-5">
          <div
            class="spinner-border text-primary"
            role="status"
            id="spinner"
          >
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>`
        setTimeout(function() {
          container.innerHTML = ``
        }, 300);
    const word = document.getElementById("input").value
    
    
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(r => r.json())
    .then(data => {
    
    const div = document.createElement("div")
    div.classList.add('m-4')
    div.innerHTML=`
        <div class="card container-fluid mb-5" style="width: 100%;">
        <div class="card-header fs-3 mb-5 fw-bold">
        ${data[0].word}
        </div>
        <ul class="list-group list-group-flush" id="list-group">
          <li class="list-group-item text-danger fw-bold d-flex justify-content-between"><div>${data[0].phonetics[0].text ? data[0].phonetics[0].text : data[0].phonetics[1].text ? data[0].phonetics[1].text : data[0].phonetics[2].text ? data[0].phonetics[2].text : data[0].phonetics[3].text ? data[0].phonetics[3].text : "/"+data[0].word}</div>
          <div>
            <button class="btn btn-primary fw-bold rounded-5" id="playBtn" onclick="document.getElementById('myAudio').play()">Play Audio</button>
            <audio id="myAudio">
              <source src="${data[0].phonetics[0].audio ? data[0].phonetics[0].audio : data[0].phonetics[1].audio ? data[0].phonetics[1].audio : data[0].phonetics[2].audio ? data[0].phonetics[2].audio : data[0].phonetics[3].audio}" type="audio/mpeg" />
            </audio>
          </div>
          </li
        </div>`
    container.appendChild(div)
    
    for (const meaning of data[0].meanings) {
        const li = document.createElement("li")
        
        li.classList.add("list-group-item")
        li.innerHTML=`
          <p class="fw-bold fs-5">${meaning.partOfSpeech}</p>
                                      <p class="fw-bold">meanings:</p>
                                      <ul id="${"def-"+meaning.partOfSpeech}">
                                         
                                      </ul>
                                      <p class="fw-bold">synonyms:</p>
                                      <ul id="${"syn-"+meaning.partOfSpeech}">
                                         
                                      </ul>
                                      <p class="fw-bold">antonyms:</p>
                                      <ul id="${"ant-"+meaning.partOfSpeech}">
                                         
                                      </ul>`
        document.getElementById("list-group").appendChild(li)
        for (const def of meaning.definitions){
            const div = document.createElement("div")
            div.innerHTML=`
            <li>${def.definition}</li>
            `
            document.getElementById(`${"def-"+meaning.partOfSpeech}`).appendChild(div)

        }
        for (const syn of meaning.synonyms){
            const div = document.createElement("div")
            div.innerHTML=`
            <li>${syn}</li>
            `
            document.getElementById(`${"syn-"+meaning.partOfSpeech}`).appendChild(div)

        }
        for (const ant of meaning.antonyms){
            const div = document.createElement("div")
            div.innerHTML=`
            <li>${ant}</li>
            `
            document.getElementById(`${"ant-"+meaning.partOfSpeech}`).appendChild(div)

        }
    }

    const li = document.createElement("li")
        li.classList.add("list-group-item")
        li.innerHTML=`
        <p class="fw-bold text-success">Source: <a href="${data[0].sourceUrls[0]}">${data[0].sourceUrls[0]}</a></p>
        </ul>`
        document.getElementById("list-group").appendChild(li)
    })
    
    .catch(error => {
        // Handle error
        container.innerHTML = `
        <div class="text-center py-5 text-secondary fw-bold fs-2">
        <p>Something went wrong</p>
        <p>Or invalid entry</p>
        <p>Please try again !!!</p></div>`
        setTimeout(function() {
          window.location.reload()
        }, 3000);
      })
      document.getElementById("input").value = ""
}

