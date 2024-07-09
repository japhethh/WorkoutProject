import { useEffect, useState, useContext, ChangeEvent, FormEvent } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the styles
import { WorkoutAdminContext } from '../context/WorkoutAdminContext';
import axios from "axios";
import { toast } from "react-toastify";

interface Data {
  head: string;
  body: string;
  footer: string;
}

const AddAnnouncement = () => {
  const context = useContext(WorkoutAdminContext);

  if (!context) {
    return null;
  }

  const { apiURL } = context;

  const [announceData, setAnnounceData] = useState<Data>({
    head: "",
    body: "",
    footer: "",
  })

  useEffect(() => {
    console.log(announceData);
  }, [announceData])

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAnnounceData((prev) => ({ ...prev, [name]: value }))
  }

  const handleQuillChange = (value: string) => {
    setAnnounceData((prev) => ({ ...prev, body: value }));
  }

  const handleOnSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${apiURL}/api/admin/announcement/addAnnouncement`, announceData);
      if (response.data.success) {
        toast.success(response.data.message);
        setAnnounceData({ head: "", body: "", footer: "" }); // Clear form fields after successful submission
      }
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
        console.log(error.response.data.message);
      }
    }
  }

  return (
    <div className="container mx-auto px-2 overflow-y-scroll h-5/6">
      <div>
        <h1 className="font-bold text-4xl py-5">
          Announcement
        </h1>
      </div>
      <form onSubmit={handleOnSubmit} className="">
        <label className="form-control w-full max-w-xs mb-3">
          <div className="label mt-5">
            <span className="label-text">Enter your Title</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs"
            value={announceData.head}
            name="head"
            onChange={handleChange}
            placeholder="Heading..."
          />
        </label>

        <ReactQuill
          className="w-full h-64 my-5 rounded-md py-5"
          value={announceData.body}
          onChange={handleQuillChange}
          placeholder="Type here..."
        />

        <label className="form-control w-full max-w-xs mb-3">
          <div className="label mt-5">
            <span className="label-text">Enter your Footer</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs"
            value={announceData.footer}
            name="footer"
            onChange={handleChange}
            placeholder="Footer..."
          />
        </label>

        <button className="btn" type="submit">
          Button
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </form>
    </div>
  );
}

export default AddAnnouncement;
