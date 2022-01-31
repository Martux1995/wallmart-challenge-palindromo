import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { faSearch, faGreaterThan, faHome, faTruck } from '@fortawesome/free-solid-svg-icons';
import { Product } from './app.interface';

import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private formBuilder: FormBuilder,
    private appService: AppService
  ) {}

  title = 'Lider';
  valorBusqueda = "";

  // icons
  faTruck = faTruck;
  faHome = faHome;
  faSearch = faSearch;
  faGreaterThan = faGreaterThan;

  // data
  productList:Product[] = [];
  page = 0;
  pageSize = 12;
  totalPages = 0;
  isPalindromo = false;

  alert = {
    on: false,
    type: 'danger',
    message: ''
  }

  // Search Query
  searchForm = this.formBuilder.group({
    search: ''
  });



  closeAlert() {
    this.alert.on = false;
  }

  changePage() {
    if (this.productList.length != 0)
      this.loadData();
  }

  onEnterSearch() {
    this.page = 1;
    this.loadData();      
  }

  loadData () {
    console.log(this.searchForm.value.search);
    if (!this.searchForm.value.search) {
      this.alert.on = false;
    }

    this.appService.getProducts(this.searchForm.value.search,{page:this.page, size:this.pageSize}).subscribe(d => {
      this.productList = d.data;
      //this.pageSize = 12;
      this.totalPages = d.extra.totalPages;
      this.valorBusqueda = this.searchForm.value.search;
      this.isPalindromo = this.isPalindrome(this.searchForm.value.search);
    },(err:any) => {
      this.alert.message = err.error.q || err.error.msg || 'Error desconocido.';
      this.alert.on = true;
    });
  }

  isPalindrome (word:string|number,removeSpaces:boolean=false) {
    
    // Get word as a string, or convert if is a number
    const x = (typeof word === "number" ? word.toString() : word)
        .trim()
        .replace(' ',removeSpaces ? '' : ' ');

    // if the word has only one letter, the word is a palindrome
    if (x.length == 1) return true;

    // if the word has two or more letter, is needed to check each letter
    // to verify the palindrome
    for (let i = 0; i < x.length / 2; i++) {

        // Check the first letter with the last, from out to in.
        // if the letters are different, the word isn't a palindrome
        if (x[i] != x[x.length-(i + 1)])
            return false;
    }
    return true;
  }
}

