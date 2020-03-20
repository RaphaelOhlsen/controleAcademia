const currentPage = location.pathname;
const menuItens = document.querySelectorAll("header .links a");

menuItens.forEach(item => {
    if(currentPage.includes(item.getAttribute('href')))
      item.classList.toggle('active');
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
const filter = pagination.dataset.filter;
const page = +pagination.dataset.page;
const total = +pagination.dataset.total;
const pages = paginate(page, total);

let elements = "";
pages.forEach(page => {
  if(page === '...') {
    elements +=`<span>${page}</span>`
  } else {
    if(filter) {
      elements += `<a href="?page=${page}&filter=${filter}">${page}</a>`
    } else {
      elements += `<a href="?page=${page}">${page}</a>`
    }
  }
})
pagination.innerHTML = elements;