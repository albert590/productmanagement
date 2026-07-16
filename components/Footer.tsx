export default function Footer() {

  return (

    <footer
      className="
        bg-slate-900
        text-white
        mt-16
      "
    >

      <div
        className="
          container
          mx-auto
          px-4
          py-10
          grid
          grid-cols-1
          md:grid-cols-3
          gap-8
        "
      >



        {/* Brand */}

        <div>


          <h2
            className="
              text-2xl
              font-bold
            "
          >
            Product Management
          </h2>



          <p
            className="
              text-slate-400
              mt-3
            "
          >
            A modern e-commerce platform for
            managing products, customers and orders.
          </p>


        </div>





        {/* Quick Links */}

        <div>


          <h3
            className="
              font-semibold
              text-lg
              mb-3
            "
          >
            Quick Links
          </h3>



          <ul className="space-y-2 text-slate-400">


            <li>
              Home
            </li>


            <li>
              Products
            </li>


            <li>
              Cart
            </li>


            <li>
              Admin Dashboard
            </li>


          </ul>


        </div>





        {/* Contact */}

        <div>


          <h3
            className="
              font-semibold
              text-lg
              mb-3
            "
          >
            Contact
          </h3>



          <p className="text-slate-400">
            Lancola Tech Company Ltd
          </p>


          <p className="text-slate-400 mt-2">
            Full Stack Development Training
          </p>


          <p className="text-slate-400 mt-2">
            © {new Date().getFullYear()} All rights reserved
          </p>


        </div>



      </div>


    </footer>

  );

}