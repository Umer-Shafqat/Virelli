import React from "react";
import "./SizeGuide.css";

const SizeGuide = () => {
  return (
    <section className="size-page">

      <div className="size-header">
        <h1>Size Guide</h1>
        <p>
          Find the perfect shoe size for a comfortable fit.
        </p>
      </div>

      <div className="size-container">

        <div className="size-card">

          <h2>Men's Shoe Size</h2>

          <table>
            <thead>
              <tr>
                <th>EU Size</th>
                <th>Foot Length</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>39</td>
                <td>24.5 cm</td>
              </tr>
              <tr>
                <td>40</td>
                <td>25.0 cm</td>
              </tr>
              <tr>
                <td>41</td>
                <td>26.0 cm</td>
              </tr>
              <tr>
                <td>42</td>
                <td>26.5 cm</td>
              </tr>
              <tr>
                <td>43</td>
                <td>27.5 cm</td>
              </tr>
              <tr>
                <td>44</td>
                <td>28.0 cm</td>
              </tr>
            </tbody>
          </table>

        </div>


        <div className="size-card">

          <h2>Women's Shoe Size</h2>

          <table>
            <thead>
              <tr>
                <th>EU Size</th>
                <th>Foot Length</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>36</td>
                <td>23.0 cm</td>
              </tr>
              <tr>
                <td>37</td>
                <td>23.5 cm</td>
              </tr>
              <tr>
                <td>38</td>
                <td>24.0 cm</td>
              </tr>
              <tr>
                <td>39</td>
                <td>25.0 cm</td>
              </tr>
              <tr>
                <td>40</td>
                <td>25.5 cm</td>
              </tr>
            </tbody>
          </table>

        </div>

      </div>

    </section>
  );
};

export default SizeGuide;