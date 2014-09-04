---
layout: page
title: Contact
permalink: /contact/
---

<div class="post">
    <form action="http://getsimpleform.com/messages?form_api_token=768d02db2f0a2c1ad67be73421c5cfd3" method="post">
      <!-- the redirect_to is optional, the form will redirect to the referrer on submission -->
      <input type='hidden' name='redirect_to' value='http://pixelpolished.com/contact/confirmation' />
      <div class="row">
          <div class="col-md-12">
              <div class="row">
                  <div class="col-md-6">
                      <div class="form-group">
                          <label for="name">Name</label>
                          <input type="text" class="form-control" id="name" placeholder="Enter name" required="required" />
                      </div>
                      <div class="form-group">
                          <label for="email">Email Address</label>
                          <input type="email" class="form-control" id="email" placeholder="Enter email" required="required" />
                      </div>
                      <div class="form-group">
                          <label for="subject">
                              Subject</label>
                          <select id="subject" name="subject" class="form-control" required="required">
                              <option value="" selected="">Choose One:</option>
                              <option value="consulting">Consulting</option>
                              <option value="speaking">Speaking</option>
                              <option value="other">Other</option>
                          </select>
                      </div>
                  </div>
                  <div class="col-md-6">
                      <div class="form-group">
                          <label for="name">Message</label>
                          <textarea name="message" id="message" class="form-control" rows="9" cols="25" required="required"
                              placeholder="Message"></textarea>
                      </div>
                  </div>
                  <div class="col-md-12">
                      <button type="submit" class="btn btn-default pull-right" id="btnContactUs">
                          Send Message</button>
                  </div>
              </div>
          </div>
      </div>
    </form>
</div>