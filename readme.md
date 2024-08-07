# Oirase Keiryu Hotel

### Guest Pages

#### Home Page

- [x] Hotel introduction
- [x] Room introduction
- [x] Traffic information
- [x] Anchor to different sections

#### Header

- [x] Drawer menu with ease-in-out design
- [x] Multiple Language

#### Footer

- [x] Contact information

---

### Admin Pages

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

- [x] Guest Signup
- [x] Guest Login
- [x] Room Reservation

### TodoList

- [] 複習 368. Converting the Modal to a Compound Component
- [] 複習 381 + 382 pagination
- [] TypeScript

### Test Account

- Account: test@gmail.com
- Password: test1234

---

### Structure of the project

|     | File Name  | Describtion                                       |
| :-- | :--------- | :------------------------------------------------ |
| [x] | assets     | folder for static files, such as images           |
| [x] | components | common, function, layout components               |
| [x] | context    | global state management                           |
| [x] | features   | components that are related to a specific feature |
| [x] | hooks      | self-defined hooks                                |
| [x] | i18n       | internationalization                              |
| [x] | pages      | admin, guest, general pages                       |
| []  | services   | api service that manipulate data from Supabase    |
| [x] | styles     | global styles                                     |
| []  | utils      | utility functions                                 |

---

Reference

- 奧入瀨溪流酒店: https://hoshinoresorts.com/zh_tw/hotels/oirasekeiryu/
