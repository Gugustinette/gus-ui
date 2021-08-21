var timetable = document.querySelector("gus-timetable")

console.log(timetable)

setTimeout((e) => {
    timetable.days = JSON.stringify(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'])

    timetable.content = JSON.stringify([
        [
            {
                "title": "Task 1",
                "startHour": "8h",
                "endHour": "10h"
            }
        ], 
        [
            {
                "title": "Task 2",
                "startHour": "13h",
                "startMinutes": "15",
                "endHour": "13h",
                "endMinutes": "45"
            },
            {
                "title": "Task 3",
                "startHour": "14h",
                "endHour": "15h"
            }
        ],
        [
            {
                "title": "Task 4",
                "startHour": "9h",
                "endHour": "10h"
            },
            {
                "title": "Task 5",
                "startHour": "11h",
                "endHour": "11h",
                "endMinutes": "30"
            }
        ],
        [
            {
                "title": "Task 7",
                "startHour": "8h",
                "endHour": "12h"
            }
        ],
        [
            {
                "title": "Task 8",
                "startHour": "14h",
                "startMinutes": "25",
                "endHour": "15h",
                "endMinutes": "3"
            }
        ]
    ])

    timetable.hours = JSON.stringify(['8h', '9h', '10h', '11h', '12h', '13h', '14h'])
}, 5000)

