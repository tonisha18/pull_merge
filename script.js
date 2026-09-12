
// ==========================================
// SUPABASE CONNECTION
// ==========================================

const SUPABASE_URL = "https://poqysdpihqmsnvbqsgvh.supabase.co";

const SUPABASE_KEY = "sb_publishable_cm1bLZuYQkuRN7F4LziG9Q_Or_RiXMQ";


const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


// ==========================================
// GET HTML ELEMENTS
// ==========================================

const studentIdInput = document.getElementById("studentId");

const searchBtn = document.getElementById("searchBtn");

const message = document.getElementById("message");

const studentCard = document.getElementById("studentCard");


// ==========================================
// SEARCH BUTTON
// ==========================================

searchBtn.addEventListener("click", getStudent);


// ==========================================
// GET STUDENT
// ==========================================

async function getStudent() {

    // Get ID entered by student

    const studentId = studentIdInput.value;


    // Check if ID is empty

    if (studentId === "") {

        message.textContent = "Please enter a Student ID";

        studentCard.style.display = "none";

        return;
    }


    // Show searching message

    message.textContent = "Searching...";

    studentCard.style.display = "none";


    // ==========================================
    // SUPABASE QUERY
    // ==========================================

    const { data, error } = await supabaseClient

        .from("students")

        .select(`
            
            id,
            name,
            roll,

            courses (
                cname,

                departments (
                    department_name,
                    hod_name
                )
            ),

            student_internships (
                duration_months,

                internships (
                    company_name,
                    location,
                    stipend
                )
            ),

            results (
                grade,
                exam_date
            )

        `)

        .eq("id", studentId)

        .single();


    // ==========================================
    // ERROR HANDLING
    // ==========================================

    if (error) {

        console.log(error);

        message.textContent = "Student not found.";

        studentCard.style.display = "none";

        return;
    }


    // ==========================================
    // DISPLAY STUDENT DATA
    // ==========================================

    message.textContent = "";

    studentCard.style.display = "block";


    // Student information

    document.getElementById("displayId").textContent =
        data.id;


    document.getElementById("name").textContent =
        data.name;


    document.getElementById("roll").textContent =
        data.roll;


    // ==========================================
    // COURSE
    // ==========================================

    if (data.courses) {

        document.getElementById("course").textContent =
            data.courses.cname;


        // Department

        if (data.courses.departments) {

            document.getElementById("department").textContent =
                data.courses.departments.department_name;


            document.getElementById("hod").textContent =
                data.courses.departments.hod_name;
        }
    }


    // ==========================================
    // INTERNSHIP
    // ==========================================

    if (
        data.student_internships &&
        data.student_internships.length > 0
    ) {

        const internshipData =
            data.student_internships[0];


        if (internshipData.internships) {

            document.getElementById("internship").textContent =
                internshipData.internships.company_name;


            document.getElementById("location").textContent =
                internshipData.internships.location;


            document.getElementById("stipend").textContent =
                "₹" + internshipData.internships.stipend;
        }
    }


    // ==========================================
    // RESULT
    // ==========================================

    if (
        data.results &&
        data.results.length > 0
    ) {

        const resultData = data.results[0];


        document.getElementById("result").textContent =
            resultData.grade;


        document.getElementById("examDate").textContent =
            resultData.exam_date;
    }

}
// javascriptfile