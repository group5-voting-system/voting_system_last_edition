import React, { useState, useEffect } from "react";
import axios from "axios";

const PartyResults = () => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/voting/results"
        );
        setResults(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch voting results");
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!results) return null;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Voting Results</h1>

      <div className="bg-white shadow-md rounded p-4 mb-4">
        <h2 className="text-xl font-semibold mb-2">General Statistics</h2>
        <p>Total Party Voters: {results.totalPartyVoters}</p>
        <p>Threshold: {results.threshold.toFixed(2)}</p>
        <p>Blank Votes: {results.blankVotes}</p>
      </div>

      <div className="bg-white shadow-md rounded p-4 mb-4">
        <h2 className="text-xl font-semibold mb-2">Qualified Party Lists</h2>
        <ul>
          {results.qualifiedLists.map((list) => (
            <li key={list.LIST_ID} className="mb-2">
              <strong>{list.LIST_NAME}</strong>: {list.COUNT_OF_VOTES} votes
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white shadow-md rounded p-4 mb-4">
        <h2 className="text-xl font-semibold mb-2">Seats per List</h2>
        <ul>
          {results.seatsPerList.map((list) => (
            <li key={list.LIST_ID} className="mb-2">
              <strong>{list.LIST_NAME}</strong>: {list.seats} seats
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white shadow-md rounded p-4">
        <h2 className="text-xl font-semibold mb-2">Elected Candidates</h2>
        <p>Total Elected: {results.totalElectedCandidates}</p>
        <ul>
          {results.electedCandidates.map((candidate) => (
            <li key={candidate.NATIONAL_ID} className="mb-2">
              {candidate.FULL_NAME} (List ID: {candidate.LIST_ID})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PartyResults;
