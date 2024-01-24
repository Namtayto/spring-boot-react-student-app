package com.nam.payload.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PaymentLinkResponse {
    private String payment_link_url;
    private String getPayment_link_id;

    public PaymentLinkResponse(String getPayment_link_id, String payment_link_url) {
        this.getPayment_link_id = getPayment_link_id;
        this.payment_link_url = payment_link_url;
    }
}
