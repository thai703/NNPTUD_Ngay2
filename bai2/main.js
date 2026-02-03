const POSTS_API = 'http://localhost:3000/posts';

async function getData() {
    try {
        const res = await fetch(POSTS_API);
        const posts = await res.json();

        const body = document.getElementById('table_body');
        body.innerHTML = '';

        for (const post of posts) {
            const isDeleted = post.isDeleted === true;
            const trClass = isDeleted ? 'deleted' : '';

            const actionHtml = isDeleted
                ? `<span>Đã xoá</span>`
                : `<input type='submit' value='Delete' onclick='Delete("${post.id}")'>`;

            body.innerHTML += `
        <tr class='${trClass}'>
          <td>${post.id ?? ''}</td>
          <td>${post.title ?? ''}</td>
          <td>${post.views ?? ''}</td>
          <td>${actionHtml}</td>
        </tr>`;
        }
    } catch (e) {
        console.log(e);
    }
}

async function Save() {
    const id = document.getElementById('txt_id').value.trim();
    const title = document.getElementById('txt_title').value.trim();
    const viewsRaw = document.getElementById('txt_views').value.trim();
    const views = viewsRaw === '' ? 0 : Number(viewsRaw);

    try {
        if (id === '') {
            // CREATE: id = maxId + 1
            const posts = await (await fetch(POSTS_API)).json();
            const maxId = posts.reduce((max, p) => {
                const n = parseInt(p.id, 10);
                return Number.isFinite(n) ? Math.max(max, n) : max;
            }, 0);

            const newId = String(maxId + 1);

            const resCreate = await fetch(POSTS_API, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: newId, title, views, isDeleted: false })
            });

            if (resCreate.ok) {
                clearForm();
                getData();
            }
        } else {
            // EDIT: PATCH để không mất isDeleted
            const check = await fetch(`${POSTS_API}/${id}`);
            if (!check.ok) {
                alert('Không tìm thấy post với ID này để sửa!');
                return;
            }

            const resEdit = await fetch(`${POSTS_API}/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, views })
            });

            if (resEdit.ok) {
                clearForm();
                getData();
            }
        }
    } catch (e) {
        console.log(e);
    }
}

async function Delete(id) {
    try {
        const res = await fetch(`${POSTS_API}/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ isDeleted: true })
        });
        if (res.ok) getData();
    } catch (e) {
        console.log(e);
    }
}

function clearForm() {
    document.getElementById('txt_id').value = '';
    document.getElementById('txt_title').value = '';
    document.getElementById('txt_views').value = '';
}

getData();
