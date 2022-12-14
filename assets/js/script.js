const currentDate = document.querySelector(".current-date"),
daysTag = document.querySelector(".days"),
prevNextIcon = document.querySelectorAll(".icons span");

// getting new date, current year and month
let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();

const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

const renderCalendar = () => {
    let firstDateofMouth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
    lastDateofMouth = new Date(currYear, currMonth +1, 0).getDate(), // getting last date of month
    lastDayofMouth = new Date(currYear, currMonth, lastDateofMouth).getDay(), // getting last day of month
    lastDateofLastMouth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
    let liTag = "";
    
    for (let i = firstDateofMouth; i > 0; i--) { // creat li of previous month last days
        liTag += `<li class="inactive">${lastDateofLastMouth - i + 1}</li>`; 
    }

    for (let i = 1; i <= lastDateofMouth; i++) { // creat li of all days of current month
        // adding active class to li if the current day, month and year matched
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() && currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}">${i}</li>`;
    }

    for (let i = lastDayofMouth; i < 6; i++) { // creat li of next month first days
        liTag += `<li class="inactive">${i - lastDayofMouth + 1}</li>`;
    }

    currentDate.innerText = `${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = liTag;
}

renderCalendar()

prevNextIcon.forEach(icon => {
    icon.addEventListener("click", () => { // adding click event on both icons
        // if clicked icon is previous icon then drecrement current mouth by 1 else increment it by 1
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        if(currMonth < 0 || currMonth > 11) { // if current month is less than 0 or greater than 11
            // creating a new date of current year & month and pass it as date value
            date = new Date(currYear, currMonth);
            currYear = date.getFullYear(); //updating current year with new date year
            currMonth = date.getMonth(); // updating current month with new date month
        } else { // else pass new Date as data value
            date = new Date();
        }
        renderCalendar();
    });
});