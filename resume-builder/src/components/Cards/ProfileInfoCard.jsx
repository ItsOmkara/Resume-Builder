import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

const ProfileInfoCard = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handelLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/");
  };

  return (
    user && (
      <div className="flex items-center gap-2 md:gap-3">
        <img
          src={user.profileImageUrl}
          alt=""
          className="w-9 h-9 md:w-11 md:h-11 bg-gray-300 rounded-full object-cover"
        />
        <div className="hidden sm:block">
          <div className="flex items-center gap-2 mb-0.5">
            <div className="text-sm md:text-[15px] font-bold leading-tight max-w-[100px] md:max-w-none truncate">
              {user.name || ""}
            </div>
            {user.subscriptionPlan === 'premium' ? (
              <div className="bg-purple-100 text-purple-800 px-1.5 md:px-2 py-0.5 rounded-full text-[10px] md:text-xs font-semibold whitespace-nowrap">
                Premium
              </div>
            ) : (
              <div className="bg-orange-100 text-orange-800 px-1.5 md:px-2 py-0.5 rounded-full text-[10px] md:text-xs font-semibold whitespace-nowrap">
                Basic
              </div>
            )}
          </div>
          <button
            className="text-purple-500 text-xs md:text-sm font-semibold cursor-pointer hover:underline"
            onClick={handelLogout}
          >
            Logout
          </button>
        </div>
        {/* Mobile-only logout button */}
        <button
          className="sm:hidden text-purple-500 text-xs font-semibold cursor-pointer hover:underline"
          onClick={handelLogout}
        >
          Logout
        </button>
      </div>
    )
  );
};

export default ProfileInfoCard;

