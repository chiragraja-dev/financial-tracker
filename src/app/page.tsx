import Image from "next/image";
import { title } from "process";
import { FcMoneyTransfer } from "react-icons/fc";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { MdDoubleArrow } from "react-icons/md";
import * as  Images from "@/assets/image"
import * as  Icons from "@/assets/icon"
import Link from "next/link";

export default function Home() {
  const keyFeatures = [
    {
      "title": "Comprehensive Money Tracking",
      "desc": "Easily track all your financial transactions in one place, including income, expenses, bills, and more. Stay organized and gain insights into your spending habits effortlessly."
    },
    {
      "title": "Intuitive Budget Tracking",
      "desc": "Set personalized budgets for different categories and track your spending against them in real-time. Receive alerts and notifications to help you stay within your budget and achieve your financial goals."
    },
    {
      "title": "Investment Portfolio Management",
      "desc": "Monitor and manage your investment portfolio with ease. Track the performance of your stocks, bonds, mutual funds, and other investments in real-time, and make informed decisions to optimize your returns."
    },
    {
      "title": "Powerful Analysis Tools",
      "desc": "Gain deeper insights into your financial health with powerful analysis tools. Visualize your financial data through customizable charts and graphs, identify trends, and uncover opportunities for savings and growth."
    },
    {
      "title": "Goal Setting and Tracking",
      "desc": "Set financial goals - whether it's saving for a vacation, buying a new home, or retiring comfortably - and track your progress over time. Receive actionable insights and recommendations to help you stay on track and achieve your goals faster."
    },
    {
      "title": "Expense Categorization and Reporting",
      "desc": "Automatically categorize your expenses and generate detailed reports to understand where your money is going. Identify areas where you can cut costs, optimize spending, and improve your overall financial well-being."
    }
  ]


  return (
    <>
      <div className="landing-bg h-[600px]">
        <div className="p-10 flex justify-between items-center">
          <h1 className="text-3xl px-10 text-amber-400 select-none flex cursor-pointer">
            FInTracker
            <FaMoneyBillTrendUp className="ml-2" />
          </h1>
          <div className="flex gap-2">
            <Link className="primary-btn font-medium " href={"/login"}>
              <span className="primary-btn-content ">Login </span>
            </Link>
            <button className="sec-btn font-medium">
              <span className="sec-btn-content">Register </span>
            </button>
          </div>
        </div>
        <div className="py-20 px-20  text-gray-100 w-[70%]">
          <div className="text-5xl 2xl:text-6xl mb-10 leading-snug"> Navigate your financial journey effortlessly </div>
          <div className="text-3xl 2xl:text-4xl mt-4">
            track, analyze, and thrive with our comprehensive financial tracker
          </div>

        </div>
      </div>
      <div className="py-16 text-center px-28 bg-gray-50 text-gray-800">
        <h1 className="text-3xl font-medium">What is the <b className="text-amber-400">FInTracker </b>?</h1>
        <p className="pt-6 leading-relaxed  text-lg px-10	">Our product is a comprehensive financial tracker designed to empower users on their financial journey. With its intuitive interface, users can effortlessly track, analyze, and optimize their finances, gaining valuable insights along the way. By unlocking the power of informed decision-making, our intelligent tracking solution streamlines financial management, allowing users to make informed choices with confidence. Say goodbye to chaos and confusion – our advanced tracker transforms financial data into clarity, ensuring users stay on top of their finances with ease, enabling them to thrive financially.</p>
      </div>
      <hr />

      <div className="landing-bg-sec h-80">
        <div className=" px-28 py-14 flex flex-col justify-center items-center text-white text-4xl w-[100%] text-center tracking-wide leading-snug">
          <p> Take control of your finances now. Sign up for free and start managing your money smarter.</p>
          <p className="mt-1"> Click the button below to get started.</p>
          <button className="primary-button-no-hover mt-4 rounded-full text-lg px-5 font-semibold hover:bg-amber-600 p-2">Register</button>
        </div>


      </div >

      <div className="py-6 px-20 bg-gray-50 pb-20">
        <h1 className=" text-3xl text-center font-medium">
          Key Fetures
        </h1>

        <div className=" grid grid-cols-2 mt-10 gap-10">
          {
            keyFeatures?.map((data: { title: string, desc: string }, index) => (
              <div key={index} className="grid border p-6 rounded-lg shadow-in transform transition-all duration-200 hover:shadow-md hover:-translate-y-2 ">
                <h1 className="text-lg flex font-semibold items-center">
                  <FcMoneyTransfer className="w-6 h-6 mr-2" />
                  {data?.title}
                </h1>
                <span className="mt-2 text-sm">
                  {data?.desc}
                </span>
              </div>
            ))
          }

        </div>
      </div>
      <div className="clip-path bg-gray-900 p-10 py-20 ">
        helli
      </div>
    </>
  );
}