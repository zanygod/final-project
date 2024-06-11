document.addEventListener('DOMContentLoaded', function() {
    const addNoteBtn = document.getElementById('addNoteBtn');
    const notesList = document.getElementById('notesList');

    addNoteBtn.addEventListener('click', function() {
        const noteTitle = document.getElementById('noteTitle').value.trim();
        const noteContent = document.getElementById('noteContent').value.trim();
        const noteCategory = document.getElementById('noteCategory').value.trim();
        const noteTags = document.getElementById('noteTags').value.trim().split(',').map(tag => tag.trim());

        if (noteTitle && noteContent) {
            const note = createNoteElement(noteTitle, noteContent, noteCategory, noteTags);
            notesList.appendChild(note);

            // Clear input fields after adding note
            clearInputFields();
        } else {
            alert('Please enter both title and content for the note.');
        }
    });

    function createNoteElement(title, content, category, tags) {
        const noteDiv = document.createElement('div');
        noteDiv.classList.add('note');
        
        const titleElement = document.createElement('h2');
        titleElement.textContent = title;

        const contentElement = document.createElement('p');
        contentElement.textContent = content;

        const categoryElement = document.createElement('p');
        categoryElement.textContent = `Category: ${category}`;

        const tagsElement = document.createElement('p');
        tagsElement.textContent = `Tags: ${tags.join(', ')}`;

        const dateTimeElement = document.createElement('p');
        dateTimeElement.classList.add('date-time');
        dateTimeElement.textContent = getCurrentDateTime();

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function() {
            noteDiv.remove();
        });

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', function() {
            // Implement edit functionality here
            alert('Edit functionality not implemented yet.');
        });

        noteDiv.appendChild(titleElement);
        noteDiv.appendChild(contentElement);
        noteDiv.appendChild(categoryElement);
        noteDiv.appendChild(tagsElement);
        noteDiv.appendChild(dateTimeElement);
        noteDiv.appendChild(deleteButton);
        noteDiv.appendChild(editButton);

        return noteDiv;
    }

    function clearInputFields() {
        document.getElementById('noteTitle').value = '';
        document.getElementById('noteContent').value = '';
        document.getElementById('noteCategory').value = '';
        document.getElementById('noteTags').value = '';
    }

    function getCurrentDateTime() {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
        return now.toLocaleDateString('en-US', options);
    }
});
