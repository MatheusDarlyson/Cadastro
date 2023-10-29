let alunos = JSON.parse(localStorage.getItem('alunos')) || [];
let alunoParaEditar = null;


function renderizarLista() {
    const listaAlunos = document.getElementById('listaAlunos');
    listaAlunos.innerHTML = '';
    alunos.forEach((aluno, index) => {
        const itemLista = document.createElement('li');
        itemLista.textContent = `${aluno.nome}, ${aluno.idade} anos, ${aluno.profissão}, ${aluno.email},${aluno.telefone};`
        
        
        const btnExcluir = document.createElement('button');
        btnExcluir.textContent = 'Excluir';
        btnExcluir.onclick = function() {
            excluirAluno(index);
        };
        
        const btnEditar = document.createElement('button');
        btnEditar.textContent = 'Editar';
        btnEditar.onclick = function() {
            carregarParaEdicao(index);
        };
        
        itemLista.appendChild(btnExcluir);
        itemLista.appendChild(btnEditar);
        listaAlunos.appendChild(itemLista);
    });
}

function salvarAluno() {
    const nome = document.getElementById('nome').value;
    const idade = document.getElementById('idade').value;
    const profissão = document.getElementById('profissão').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;

    // Verifica se está em modo de edição
    if(alunoParaEditar !== null) {
        alunos[alunoParaEditar] = {nome, idade, profissão, email, telefone};
        alunoParaEditar = null;
        document.getElementById('btnAtualizar').style.display = 'none';
    } else {
        alunos.push({nome, idade, profissão, email, telefone});
    }
    
    localStorage.setItem('alunos', JSON.stringify(alunos));
    
    document.getElementById('nome').value = '';
    document.getElementById('idade').value = '';
    document.getElementById('profissão').value = '';
    document.getElementById('email').value = '';
    document.getElementById('telefone').value = '';
    renderizarLista();
}

function excluirAluno(index) {
    alunos.splice(index, 1);
    localStorage.setItem('alunos', JSON.stringify(alunos));
    renderizarLista();
}

function carregarParaEdicao(index) {
    alunoParaEditar = index;
    document.getElementById('nome').value = alunos[index].nome;
    document.getElementById('idade').value = alunos[index].idade;
    document.getElementById('profissão').value = alunos[index].profissão;
    document.getElementById('email').value = alunos[index].email;
    document.getElementById('telefone').value = alunos[index].telefone;
    
    document.getElementById('btnAtualizar').style.display = 'inline-block';
}

function atualizarAluno() {
    const nome = document.getElementById('nome').value;
    const idade = document.getElementById('idade').value;
    const profissão = document.getElementById('profissão').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;

    alunos[alunoParaEditar] = {nome, idade, profissão, email, telefone};
    localStorage.setItem('alunos', JSON.stringify(alunos));
    
    document.getElementById('nome').value = '';
    document.getElementById('idade').value = '';
    document.getElementById('profissão').value = '';
    document.getElementById('email').value = '';
    document.getElementById('telefone').value = '';
    document.getElementById('btnAtualizar').style.display = 'none';

    alunoParaEditar = null;
    renderizarLista();
}

renderizarLista();