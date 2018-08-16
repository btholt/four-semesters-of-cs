'use strict';
(function() {
    var counter = 0;
    var startPres = function(id) {
        var node = document.getElementById(id);
        node.addEventListener('click', handleStart);
    };

    var handleStart = function() {
        showOnly(0);
        document.addEventListener('keyup', advance);
    }

    var advance = function(e) {
        if (e.keyCode === 37) {
            // left arrow
            counter--;
            showOnly(counter);
        }
        else if (e.keyCode === 39) {
            counter++;
            showOnly(counter);
        }
    }

    var showOnly = function(index) {
        var nodes = document.getElementsByTagName('article');


        for (var i = 0; i < nodes.length; i++) {
            if (counter === i) {
                console.log(i, nodes[i]);
                var replace = 'invisible';
                if (nodes[i].className.indexOf(' invisible') >= 0) {
                    replace = ' invisible';
                }

                nodes[i].className = nodes[i].className.replace(replace, '');
                nodes[i].scrollIntoView();
            }
            else if (nodes[i].className.indexOf('invisible') < 0) {
                nodes[i].className += (nodes[i].className.length) ? ' invisible' : 'invisible';
            }
        }
    };

    startPres('start');

    // https://gist.github.com/mathewbyrne/1280286
    const slugify = (text)  => {
      return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
    }

    const generateToc = () =>  {
      const getAllTitles = () => [...document.querySelectorAll('.chapter-group-title, .chapter-title')]
      const listItems = getAllTitles()
        .map( elem => {
          const slug = slugify(elem.innerHTML)
          elem.setAttribute('id', slug);

          const li = document.createElement('li');
          const a = document.createElement('a');
          a.textContent = elem.textContent
          a.href = `#${slug}`
          li.appendChild(a)
          return li
        })
      
      listItems.shift(); // remove the 'table of content' heading
      const ul = document.createElement('ul')
      ul.classList.add('toc')
      listItems.forEach(item => ul.appendChild(item))
      return ul
    }

    const insertToc = () => {
      const ul = generateToc()
      const tocDiv = document.querySelector("#table-of-content").closest('.chapter').querySelector('.chapter-text')
      tocDiv.appendChild(ul);
    }
    
    insertToc()

})();