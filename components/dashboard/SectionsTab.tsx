'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

interface ISectionsTabProps {
    sedinte: React.ReactNode;
    membri: React.ReactNode;
    functii_secretar?: React.ReactNode;
}

export default function SectionsTab({
    sedinte,
    membri,
    functii_secretar,
}: ISectionsTabProps) {
    return (
        <Tabs defaultValue="sedinte">
            <TabsList className="grid grid-flow-col justify-start">
                <TabsTrigger value="sedinte">Sedinte</TabsTrigger>
                <TabsTrigger value="membri">Membri</TabsTrigger>
                {functii_secretar && (
                    <TabsTrigger value="functii_secretar">
                        Functii secretar
                    </TabsTrigger>
                )}
            </TabsList>
            <TabsContent value="sedinte">{sedinte}</TabsContent>
            <TabsContent value="membri">{membri}</TabsContent>
            {functii_secretar && (
                <TabsContent value="functii_secretar">
                    {functii_secretar}
                </TabsContent>
            )}
        </Tabs>
    );
}
