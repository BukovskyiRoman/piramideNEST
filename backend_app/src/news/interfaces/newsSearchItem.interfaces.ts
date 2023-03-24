interface newsSearchItem {
    _source: {
        id: number,
        title: string,
        body: string,
        source: string,
        date: string,
        href: string
    }
}
