import Banner from "../Banner/Banner";
import StudySession from "../StudySession/StudySession";
import Tutor from "../Tutor/Tutor";
import HowItWorks from "../HowItWorks/HowItWorks";
import Testimonials from "../Testimonials/Testimonials";


const Home = () => {
  return (
    <div className="dark:text-gray-100">
      {/* Hero */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight ">
              Learn English with Expert Tutors
            </h1>
            <p className="text-base sm:text-lg  max-w-2xl">
              Join thousands of learners and accelerate your English speaking,
              writing and comprehension with live sessions, curated materials,
              and one-on-one tutoring.
            </p>

         

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-md">
              <div className="text-center">
                <div className="text-2xl font-bold">4.9</div>
                <div className="text-sm ">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">1k+</div>
                <div className="text-sm ">Active Students</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">300+</div>
                <div className="text-sm ">Sessions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">100+</div>
                <div className="text-sm ">Expert Tutors</div>
              </div>
            </div>
          </div>

          <div className="hidden lg:block">
            {/* Keep the existing banner swiper for large screens */}
            <div className="rounded-xl overflow-hidden shadow-2xl border border-white/10">
              <Banner />
            </div>
          </div>
        </div>
      </section>



  {/* Quick features */}
      <section className="py-12 ">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6  rounded-lg  border-[1px]">
              <h3 className="font-semibold text-lg">Live 1:1 Tutoring</h3>
              <p className="text-sm mt-2 ">Personalized lessons focused on your goals with certified tutors.</p>
            </div>
            <div className="p-6  rounded-lg  border-[1px]">
              <h3 className="font-semibold text-lg">Interactive Materials</h3>
              <p className="text-sm mt-2 ">Practice exercises, notes, and quizzes curated for every level.</p>
            </div>
            <div className="p-6  rounded-lg  border-[1px]">
              <h3 className="font-semibold text-lg">Flexible Scheduling</h3>
              <p className="text-sm mt-2 ">Book sessions when it fits your routine — morning, noon or night.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sections - keep existing components but wrapped with anchors and spacing */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 space-y-20 py-12">
        <section id="sessions">
          <StudySession />
        </section>

        <section id="tutors">
          <Tutor />
        </section>
      </main>

        {/* Extra sections */}
  <Testimonials />
  <HowItWorks />
    </div>
  );
}

export default Home