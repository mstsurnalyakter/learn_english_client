import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useParams } from "react-router";
import DynamicTitle from "../../components/Shared/DynamicTitle/DynamicTitle";
import { FaStar, FaShareAlt, FaBookmark } from "react-icons/fa";
import { useEffect } from 'react';
// import Review from "../../components/Review/Review";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../components/Shared/LoadingSpinner/LoadingSpinner";
import BookingModal from "./BookingModal";
import { useState } from "react";
import toast from "react-hot-toast";
import useReviews from "../../hooks/useReviews";
import useRole from "../../hooks/useRole";
import ReviewSection from "../../components/Review/ReviewSection";

const SessionDetail = () => {
  const axiosSecure = useAxiosSecure();
  const { role } = useRole();
  const { user } = useAuth();
  const { id } = useParams();
  const { reviews, reviewLoading } = useReviews(id);
  const [isOpen, setIsOpen] = useState(false);
  const [saved, setSaved] = useState(false);



  // averageRating

  const sum = reviews.reduce((sum, review) => sum + review?.rating, 0);
  const averageRating = parseFloat((sum / reviews?.length).toPrecision(2));

  const closeModal = () => {
    setIsOpen(false);
  };

  // saved toggle
  useEffect(() => {
    try {
      const key = `saved_session_${id}`;
      const s = localStorage.getItem(key);
      setSaved(!!s);
  } catch (e) { console.debug(e); }
  }, [id]);

  const toggleSave = () => {
    try {
      const key = `saved_session_${id}`;
      if (saved) {
        localStorage.removeItem(key);
        setSaved(false);
        toast.success('Removed from saved');
      } else {
        localStorage.setItem(key, JSON.stringify({ id, sessionTitle }));
        setSaved(true);
        toast.success('Saved to your list');
      }
    } catch (e) {
      // ignore
    }
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: sessionTitle, url: shareUrl });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        toast.success('Link copied to clipboard');
      }
    } catch (e) {
      toast.error('Unable to share');
    }
  };

  const {
    data: session = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["session", id],
    enabled: !!id && !!localStorage.getItem("access-token"),
    queryFn: async () => {
      const { data } = await axiosSecure(`session/${id}`);
      return data;
    },
  });

  const {
    imageURL,
    sessionTitle,
    registrationFee,
    registrationStartDate,
    registrationEndDate,
    classStartDate,
    classEndDate,
    sessionDescription,
    sessionDuration,
    status,
    students,
    _id,
    user: tutorInfo,
  } = session || {};

  const student = {
    name: user?.displayName,
    email: user?.email,
    image: user?.photoURL,
  };

  const checkStartDate = new Date(session?.registrationStartDate) <= new Date();
  const checkEndDate = new Date(session?.registrationEndDate) >= new Date();

  const handleBook = async () => {
    const bookingInfo = {
      sessionID: _id,
      student,
      sessionTitle,
      user: tutorInfo,
      registrationFee,
      date: new Date(),
    };
    console.log(bookingInfo);

    try {
      const { data } = await axiosSecure.post("/booking", bookingInfo);

      if (data.insertedId) {
        refetch();
        toast.success("Session Booked successfully.");
      }
    } catch (error) {
      if (error.response.data) return toast.error(error.response.data);
      toast.error(error.message);
    }
  };

  if (isLoading || reviewLoading) return <LoadingSpinner />;
  return (
    <div className="space-y-12">
      <DynamicTitle pageTitle="Session Details" />

      {/* Hero with image and overlay summary */}
      <header className="relative">
        <div className="h-[220px] sm:h-[280px] md:h-[420px] lg:h-[520px] w-full overflow-hidden rounded-lg">
          <img loading="lazy" src={imageURL} alt={sessionTitle} className="w-full h-full object-cover brightness-90" />
        </div>

        <div className="-mt-12 md:-mt-24 max-w-7xl mx-auto px-6 lg:px-8 relative z-20">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl p-4 sm:p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            <div className="md:col-span-2">
              <h1 className="text-2xl md:text-3xl font-bold">{sessionTitle}</h1>
              <p className="mt-2 text-sm text-gray-600 ">{sessionDescription?.slice(0, 180)}</p>

              <div className="mt-4 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                    <img src={tutorInfo?.image} alt={tutorInfo?.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">{tutorInfo?.name}</div>
                    <div className="text-xs text-gray-500">Tutor</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <span className="inline-flex items-center text-yellow-500"><FaStar /></span>
                  <span className="font-medium">{Number.isFinite(averageRating) ? averageRating : 0}</span>
                  <span className="text-gray-500">({reviews?.length || 0} reviews)</span>
                </div>

                <div className="inline-flex items-center gap-2 text-sm">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${status === 'ongoing' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{status || 'Upcoming'}</span>
                </div>

                <div className="ml-auto flex items-center gap-3">
                  <button onClick={handleShare} aria-label="Share" className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-600">
                    <FaShareAlt />
                  </button>
                  <button onClick={toggleSave} aria-label="Save" className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-600">
                    <FaBookmark className={saved ? 'text-blue-600' : ''} />
                  </button>
                </div>
              </div>
            </div>

            <div className="md:col-span-1">
              <div className="bg-gray-50 dark:bg-slate-900 p-4 rounded-lg">
                <div className="text-sm text-gray-500">Price</div>
                <div className="text-2xl font-bold mt-1">{registrationFee ? new Intl.NumberFormat('en-US', {style:'currency', currency:'USD'}).format(registrationFee) : 'Free'}</div>
                <div className="text-sm text-gray-500 mt-3">Duration: <span className="font-medium">{sessionDuration || 'N/A'} hrs</span></div>
                <div className="text-sm text-gray-500 mt-1">Seats: <span className="font-medium">{students || '—'}</span></div>
                <div className="mt-4">
                  <button
                    onClick={() => (registrationFee > 0 ? setIsOpen(true) : handleBook())}
                    disabled={role === 'admin' || role === 'tutor' || !checkStartDate || !checkEndDate}
                    className="w-full px-4 py-2 rounded-md bg-blue-600 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {checkStartDate && checkEndDate ? 'Book Now' : 'Registration Closed'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content - details and reviews */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <article className="lg:col-span-2 space-y-6">
          <section className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold">About this session</h3>
            <p className="mt-3 text-gray-700 ">{sessionDescription}</p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 dark:bg-slate-900 rounded">
                <div className="text-sm text-gray-500">Registration</div>
                <div className="mt-1 text-sm">{registrationStartDate ? new Date(registrationStartDate).toLocaleDateString() : '—'} to {registrationEndDate ? new Date(registrationEndDate).toLocaleDateString() : '—'}</div>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-slate-900 rounded">
                <div className="text-sm text-gray-500">Class Dates</div>
                <div className="mt-1 text-sm">{classStartDate ? new Date(classStartDate).toLocaleDateString() : '—'} to {classEndDate ? new Date(classEndDate).toLocaleDateString() : '—'}</div>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-2xl font-bold dark:text-gray-200">Student Reviews</h3>
            <div className="mt-4 space-y-4">
              {reviews?.length > 0 ? (
                reviews.map(r => <ReviewSection key={r._id} review={r} />)
              ) : (
                <div className="text-gray-500">No reviews yet. Be the first to review this session.</div>
              )}
            </div>
          </section>
        </article>

        <aside className="space-y-6 lg:col-span-1 lg:sticky lg:top-28">
          <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
            <h4 className="text-sm text-gray-500">Tutor</h4>
            <div className="mt-3 flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                <img src={tutorInfo?.image} alt={tutorInfo?.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="font-medium">{tutorInfo?.name}</div>
                <div className="text-sm text-gray-500">{tutorInfo?.email}</div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
            <h4 className="text-sm text-gray-500">Session quick facts</h4>
            <ul className="mt-3 text-sm space-y-2 text-gray-700 dark:text-gray-300">
              <li><strong>Duration:</strong> {sessionDuration || '—'} hrs</li>
              <li><strong>Seats:</strong> {students || '—'}</li>
              <li><strong>Fee:</strong> {registrationFee ? new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(registrationFee) : 'Free'}</li>
            </ul>
          </div>
        </aside>
      </main>

      {/* Booking modal */}
      <BookingModal
        isOpen={isOpen}
        closeModal={closeModal}
        refetch={refetch}
        bookingInfo={{
          ...session,
          sessionID: session?._id,
          student,
        }}
      />
    </div>
  );
};

export default SessionDetail;
