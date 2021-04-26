import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'wed-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss']
})
export class TransactionFormComponent implements OnInit {

  constructor(private transactionService: TransactionService) {
  }

  ngOnInit(): void {
  }

  public onSubmit(f?: NgForm): boolean {
    if (f && f.valid) {

    }
    return false;
  }
}
