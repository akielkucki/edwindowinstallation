export  function WindowPreviews() {
    return <div className="flex flex-col gap-4 py-32">
        {Array.from({ length: 6 }).map((_, i) => (<div></div>))}
    </div>
}