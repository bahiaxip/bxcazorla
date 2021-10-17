<div class="flex_header">
  <div class="div_flex_item" style="" >

    <div class="flex_item" >
      <div class="w15 div_iconleft">
      <!-- condition en ngClass método1 -->
        <mat-icon class="icon_left"  style="" (click)="sendPanel(0)" [ngClass]="{'icon_visible':panel=='1','icon_novisible':panel!='1','icon_transitionActive':switchTransitionFirst}" >double_arrow</mat-icon>
      </div>
      <div class="w70 div_center" style="">
        <p class="mauto c_white">{{titleProximity}}</p>  
      </div>
      <div class="w15 div_iconright">
      <!-- condition en ngClass método2 -->
        <mat-icon class="icon_right"  style="" (click)="sendPanel(1)" [ngClass]="(panel=='0' ? 'icon_visible':'icon_novisible')+' '+(switchTransitionFirst==true ? 'icon_transitionActive':'')">double_arrow</mat-icon>
      </div>
    </div>
  </div>
</div>