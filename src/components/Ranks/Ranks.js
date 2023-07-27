function Ranks({name, entries}) {
    return (
        <div className="white">
            <div>{`${name}, your current entry count is..`}</div>
            <div className="mt2 f3">{entries}</div>
        </div>
    );
}

export default Ranks;