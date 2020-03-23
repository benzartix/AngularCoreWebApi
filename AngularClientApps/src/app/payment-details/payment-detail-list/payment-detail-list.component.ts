import { PaymentDetailService } from './../../shared/payment-detail.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-detail-list',
  templateUrl: './payment-detail-list.component.html',
  styles: []
})
export class PaymentDetailListComponent implements OnInit {

  constructor(public service:PaymentDetailService , private toastr:ToastrService) { }

  ngOnInit() {
    this.service.refreshList();
  }

  populateForm(selectedRecord) {
    this.service.formData = Object.assign({}, selectedRecord);
  }

  onDelete(PMId) {
    if (confirm('Are you sure to delete this record ?')) {
      this.service.deletePaymentDetail(PMId)
        .subscribe(res => {
          this.service.refreshList();
          this.service.resetForm();
          this.toastr.warning('Deleted successfully', 'Payment Detail Register');

        },
        err => { console.log(err); })
    }
  }
}