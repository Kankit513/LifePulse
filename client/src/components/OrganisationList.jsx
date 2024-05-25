import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";

export default function OrganisationList({ organisation }) {

  const params = useParams();

  return (
    <div className="bg-gray-200 shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-md w-full sm:w-[345px] border-solid border-2 border-zinc-600">
      <img
        src={
          "https://plus.unsplash.com/premium_photo-1682309570054-e2fdcbb2c682?q=80&w=1824&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
        alt="organisation cover"
        className="h-[220px] sm:h-[240px] w-full object-cover hover:scale-105 transition-scale duration-300"
      />
      <div className="p-3 flex flex-col gap-2 w-full">
        <p className="truncate text-xl font-semibold uppercase text-slate-900">
          {organisation.organisationName}
        </p>
        <div className="flex items-center gap-1 mt-1">
          <MdOutlineMailOutline className="text-xl text-sky-600" />
          <p className="text-lg text-slate-900 truncate w-full">
            {organisation.email}
          </p>
        </div>
        <div className="flex items-center gap-1 mt-1">
          <FaPhone className="text-lg text-pink-600" />
          <p className="text-lg text-slate-900 truncate w-full">
            {organisation.phone}
          </p>
        </div>
        <div className="flex items-center gap-1 mt-1">
          <FaMapMarkerAlt className="text-md text-green-700" />
          <p className="text-lg text-slate-900 truncate w-full">
            {organisation.address}
          </p>
        </div>
        <div className="flex gap-3 mt-1">
          <Link to={`/organisation-blood-stock/${organisation._id}`} className="bg-violet-700 text-white w-full max-w-[160px] p-1 rounded-md text-center hover:opacity-90">
            Check Blood Stock
          </Link>
        </div>
      </div>
    </div>
  );
}
