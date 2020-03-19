const currentPage = location.pathname;
const menuItens = document.querySelectorAll("header .links a");
const formDelete = document.querySelector("#form-delete");

menuItens.forEach(item => {
    if(currentPage.includes(item.getAttribute('href')))
      item.classList.toggle('active');
});

formDelete.addEventListener("submit", e => {
  const confirmation = confirm('Deseja Deletar ? ');
  if(!confirmation) e.preventDefault();
});


function paginate(selectedPage, totalPages) {

  let pages = [],
      oldPage;
  
  for(let currentPage = 1; currentPage <= totalPages; currentPage++) {
    const fisrtAndLastPage = currentPage == 1 || currentPage == totalPages;
    const pagesAfterSelectdPage = currentPage <= selectedPage + 2;
    const pagesBeforeSelectecPage = currentPage >=selectedPage - 2;
    
    if(fisrtAndLastPage || pagesBeforeSelectecPage && pagesAfterSelectdPage) {
      if(oldPage && currentPage - oldPage > 2) pages.push('...');
      pages.push(currentPage);
      oldPage = currentPage;
    }
    if(currentPage == totalPages - 1 && currentPage - totalPages > 2) 
      pages.push('...');
  }
  
  return pages;
}

const pagination = document.querySelector(".pagination");
const page = +pagination.dataset.page;
const total = +pagination.dataset.total;