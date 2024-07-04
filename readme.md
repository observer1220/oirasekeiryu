# Oirase Keiryu Hotel

### For Guest

#### Header

- [x] Drawer menu with ease-in-out design
- [] Multiple Language
- [] Breadcrumb

#### Home Page

- [x] Hotel introduction
- [] Room introduction
- [] Traffic information

#### Reservation Page

- [] Display cabin list that guest can reserve room.

#### Guest Information Page

- [] Guest sign up
- [] Guest information update
- [] Delete booking

---

### For Admin

#### Login Page

- [x] Login Function: type email and password, then click login button. If success, redirect to dashboard page. If fail, show error message.

#### Dashboard Page

- [x] Display Total booking numbers, Sales numbers, Check-in numbers, Occupancy rate.

#### Bookings Page

- [x] Display Booking List.
- [x] Sorting Function:
      -- [x] Radio Button: switch check-in, check-out, status to filter booking list.
      -- [x] Dropdown List: sort by date, sort by amount.
- [x] See Details Button: Navigate to booking details page.
      -- [x] Check-in Button: Navigate to check-in page.
      -- [x] Delete Button: delete booking order.
      -- [x] Go Back Button.
- [x] Check-in Pages: Navigate to check-in page.
      -- [x] Checkbox for adding breakfast to booking order.
      -- [x] Checkbox for confirming payment.
      -- [x] Check-in Button: update booking status to check-in.
      -- [x] Go Back Button.
- [x] Delete Function: Delete booking order.

#### Cabins Page

- [x] Display Cabin List.
      -- [] Picture zoom-in.
- [x] Sorting Function:
      -- [x] Radio Button: no discount, with discount.
      -- [x] Dropdown List: sort by name, price, capacity.
- [x] Add Cabin
      -- [] Maximum capacity has no limit, but setting has limit.
- [x] Duplicate Cabin
- [x] Edit Cabin
- [x] Delete Cabin: related to bookings, if there's a booking, cannot be deleted.

#### Users

- [x] Cearate Admin Account
      -- [x] Logout and sending verification email to the new admin user.
- [x] Update Admin User Information
      -- [x] Name field validation

#### Settings

- [x] Update Hotel Settings: Minimum stay, Maximum stay, Maximum guests, Breakfast price.

#### Guests Page

- [] Guest List: not done yet.

### TodoList

- [x] Deploy failure on Vercel
- [] 複習 368. Converting the Modal to a Compound Component
- [] 複習 381 + 382 pagination
- [] 釐清 display: grid 實作方法
- [] Split common components and business components.
- [] TypeScript

### Test Account

- Account: test@gmail.com
- Password: test1234

---

### Structure of the project

- assets: static files
- context: global state management
- data: fake data
- features: components that are related to a specific feature
- hooks: self-defined hooks
- i18n: internationalization
- pages: main pages
- services: api services
- styles: global styles
- ui: common components
- utils: utility functions

---

Reference

- 奧入瀨溪流酒店: https://hoshinoresorts.com/zh_tw/hotels/oirasekeiryu/
