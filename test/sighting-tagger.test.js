import React from "react";
import {
  render,
  screen
} from "@testing-library/react";

import userEvent from
  "@testing-library/user-event";

import "@testing-library/jest-dom";

import SightingTagger
  from "../sighting-tagger";

describe(
  "Wildlife Census Sighting Tagger",
  () => {

    test(
      "renders all species cards",
      () => {

        render(<SightingTagger />);

        expect(
          screen.getByText("Tiger")
        ).toBeInTheDocument();

        expect(
          screen.getByText("Elephant")
        ).toBeInTheDocument();

        expect(
          screen.getByText("Leopard")
        ).toBeInTheDocument();

        expect(
          screen.getByText("Deer")
        ).toBeInTheDocument();
      }
    );


    test(
      "each species card keeps its own isTagged state",
      async () => {

        const user = userEvent.setup();

        render(<SightingTagger />);

        const tigerCard =
          screen.getByTestId(
            "species-card-1"
          );

        const elephantCard =
          screen.getByTestId(
            "species-card-2"
          );

        const tigerButton =
          tigerCard.querySelector("button");

        const elephantButton =
          elephantCard.querySelector("button");


        // Initially both are untagged

        expect(tigerButton)
          .toHaveTextContent(
            "Tag Sighting"
          );

        expect(elephantButton)
          .toHaveTextContent(
            "Tag Sighting"
          );


        // Tag Tiger

        await user.click(tigerButton);


        // Tiger is tagged

        expect(tigerButton)
          .toHaveTextContent("Tagged");


        // Elephant remains untagged

        expect(elephantButton)
          .toHaveTextContent(
            "Tag Sighting"
          );


        // Tag Elephant

        await user.click(elephantButton);


        expect(tigerButton)
          .toHaveTextContent("Tagged");

        expect(elephantButton)
          .toHaveTextContent("Tagged");


        // Untag Tiger

        await user.click(tigerButton);


        // Tiger is untagged

        expect(tigerButton)
          .toHaveTextContent(
            "Tag Sighting"
          );


        // Elephant remains tagged

        expect(elephantButton)
          .toHaveTextContent("Tagged");
      }
    );


    test(
      "tag status appears only for tagged species",
      async () => {

        const user = userEvent.setup();

        render(<SightingTagger />);

        const tigerCard =
          screen.getByTestId(
            "species-card-1"
          );

        const tigerButton =
          tigerCard.querySelector("button");


        expect(
          screen.queryByTestId(
            "tag-status-1"
          )
        ).not.toBeInTheDocument();


        await user.click(tigerButton);


        expect(
          screen.getByTestId(
            "tag-status-1"
          )
        ).toBeInTheDocument();


        expect(
          screen.queryByTestId(
            "tag-status-2"
          )
        ).not.toBeInTheDocument();
      }
    );

  }
);